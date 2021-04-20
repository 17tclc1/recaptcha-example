require('dotenv').config({ path: `${__dirname}/../../../.env` });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authService = require('./index.service');
const { HTTPException } = require('../../common/helpers/errorHandler');
const {
  USER_NOT_FOUND,
  INVALID_CREDENTIAL,
} = require('../../constants/httpMessage');
const { JWT_SECRET, JWT_EXPIRE } = require('../../common/env/env');

const login = async (req, res, next) => {
  try {
    const user = await authService.getOneByEmail(req.body.email);
    if (!user) {
      throw new HTTPException(404, USER_NOT_FOUND);
    }
    const check = await bcrypt.compare(req.body.password, user.password);
    if (!check) {
      throw new HTTPException(401, INVALID_CREDENTIAL);
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: parseInt(JWT_EXPIRE, 10),
      noTimestamp: true,
    });
    return res.json({
      status: 'success',
      statusCode: 200,
      data: {
        ...user,
        token,
      },
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
};
