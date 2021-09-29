const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const createError = require('http-errors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const indexRouter = require('../src/routes/index');

// const config = require('../config');
const app = express();

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self"],
                scriptSrc: ["'self"]
            }
        },
        referrerPolicy: { policy: 'same-origin' }
    })
);

// handle cors
app.use(cors());

/**
 * set up route
 */
app.use('/', indexRouter);

/**
 * connect DB
 */

// make use of morgan
app.use(logger('dev'));
// allow collection of payload from body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 400);
    res.json({ error: err.message, message: 'Operation failed' });
});

module.exports = app;
