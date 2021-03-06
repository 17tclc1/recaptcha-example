// ExpressJS dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const chalk = require('chalk');
const router = require('./src/app.router');
const { handleError } = require('./src/common/helpers/errorHandler');
const { job } = require('./src/common/helpers/cronClean');
const { PORT } = require('./src/common/env/env');
const cors = require('cors');
// ExpressJS application
const app = express();
app.use(cors())
// ExpressJS middleware
app.set('trust proxy', true);
job.start();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Router configuration
router.forEach(route => {
  app[route.method](`/v1${route.path}`, ...route.handlers);
});

// 404 error handler
app.use(function(req, res, next) {
  return res.status(404).json({
    status: 'error',
    code: 404,
    message: `${req.url} not found`,
  });
});

// Error handler
app.use(function(err, req, res, next) {
  handleError(err, res);
});

// Initialize ExpressJS app
app.set('port', PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`${chalk.green('✓')} App is running at http://localhost:${app.get('port')} in ${chalk.yellow(app.get('env'))}mode`);
	console.log('Press CTRL-C to stop\n');
});
// Export app instance
module.exports = server;