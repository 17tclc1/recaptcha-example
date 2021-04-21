<template>
  <div class="login-background">
    <b-card
      tag="article"
      style="max-width: 25rem;min-height: 300px;"
      class="mb-2 login-card p-2"
    > 
      <h2 class="login-title mb-4">
        Login
      </h2>
      <b-form @submit.prevent="submit">
        <b-form-group
          id="input-group-1"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            class="login-input"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.password"
            class="login-input"
            type="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>
        <b-img v-if="!recaptchaHidden" :src="recaptcha.url" width="300" height="150" class="mb-3"></b-img>
        <b-input-group
          v-if="!recaptchaHidden"
          id="input-group-2"
          label-for="input-2"
          class="mb-4"
        >
          <b-form-input
            id="input-2"
            v-model="recaptcha.result"
            class="login-input"
            type="text"
            placeholder="Type character above"
            required
          ></b-form-input>
          <b-input-group-append>
              <b-button @click="submitRecaptcha" variant="info" style="border-top-right-radius: 30px;border-bottom-right-radius: 30px">Validate</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-button type="submit" variant="primary" class="w-100" style="border-radius: 30px" :disabled="!recaptchaHidden">Submit</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';
import { debounce } from 'lodash';
export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      recaptchaHidden: true,
      recaptcha: {
        url: null,
        recaptcha_uid: null,
        device_uid: null,
        result: null,
      },
      trustToken: null,
    }
  },
  methods: {
    requestRecaptcha: debounce(async function() {
      try {
        this.recaptcha.result = null;
        const payload = await axios.get(process.env.VUE_APP_RECAPTCHA_BASE_URL);
        if(payload.data.statusCode === 200) {
          this.recaptcha.url = payload.data.data.recaptcha;
          this.recaptcha.device_uid = payload.data.data.device_uid
          this.recaptcha.recaptcha_uid = payload.data.data.recaptcha_uid
          this.recaptchaHidden = false;
        }
      } catch (error) {
        if(error.response && error.response.data) {
          this.$bvToast.toast(error.response.data.message, {
            title: 'An error has occurred while requesting recaptcha',
            autoHideDelay: 3000,
            variant: 'danger',
            appendToast: false
          });
        } else {
          console.log(error);
          this.$bvToast.toast('An unknown error has occurred. Please try again', {
            title: 'An error has occurred while requesting recaptcha',
            autoHideDelay: 3000,
            variant: 'danger',
            appendToast: false
          });
        }
      }
    }, 500),
    submitRecaptcha: debounce(async function() {
      try {
        const payload = await axios.post(`${process.env.VUE_APP_RECAPTCHA_BASE_URL}/solve`, this.recaptcha);
        this.trustToken = payload.data.data.trustToken
        this.recaptchaHidden = true;
      } catch (error) {
        console.log(error);
        if(error.response && error.response.data) {
          this.$bvToast.toast(error.response.data.message, {
            title: 'An error has occurred while submiting recaptcha',
            autoHideDelay: 3000,
            variant: 'danger',
            appendToast: false
          });
        } else {
          console.log(error);
          this.$bvToast.toast('An unknown error has occurred. Please try again', {
            title: 'An error has occurred while submiting recaptcha',
            autoHideDelay: 3000,
            variant: 'danger',
            appendToast: false
          });
        }
        await this.requestRecaptcha();
      }
    }, 500),
    submit: debounce(async function() {
      try {
        if(!this.trustToken) {
          await this.requestRecaptcha();
        } else {
          const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/auth/login`, {
            email: this.form.email,
            password: this.form.password,
            trustToken: this.trustToken,
          });
          if(response.data.statusCode === 200) {
            console.log(response.data.data);
            localStorage.setItem('token', response.data.data);
          } else {
            await this.requestRecaptcha();
          }
        }
      } catch (error) {
        if(error.response && error.response.data) {
          this.$bvToast.toast(error.response.data.message, {
            title: 'An error has occurred while login',
            autoHideDelay: 3000,
            variant: 'danger',
            appendToast: false
          });
        } else {
          console.log(error);
          this.$bvToast.toast('An unknown error has occurred. Please try again', {
            title: 'An error has occurred while requesting recaptcha',
            autoHideDelay: 3000,
            variant: 'danger',
            appendToast: false
          });
        }
        await this.requestRecaptcha();
      }
    }, 500),
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito:600,700,900');
.login-title {
  text-align: center;
  font-family: 'Nunito';
}
.login-input {
  border-radius:30px;
}
.login-background {
  min-height: 100vh;
  width: 100%;
  background-image: url('../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.login-card {
  border-radius: 25px;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  max-width: 400px;
}
</style>