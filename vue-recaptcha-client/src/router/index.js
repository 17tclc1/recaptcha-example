import Vue from 'vue'
import VueRouter from 'vue-router';
import Home from '../page/Home.vue';
import Login from '../page/Login.vue';
import { IsAuthenticated, IsNotAuthenticated } from '../middlewares/auth';
import NotFound from '../page/404.vue';
Vue.use(VueRouter);
const routes = [
  { 
    path: '/',
    component: Home,
    beforeEnter: IsNotAuthenticated
  },
  { 
    path: '/login',
    component: Login,
    beforeEnter: IsAuthenticated
  },
  {
    path: '*',
    component: NotFound,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router;