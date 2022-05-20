const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/user');
const funCatch = require('../utils/funCatch');
const users = require('../controllers/users')


router.route('/register')
    .get((users.registerForm))
    .post(funCatch(users.registerSubmit));

router.route('/login')
    .get(users.loginRender)
    .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login'
    }), users.loginSubmit);

router.get('/logout', users.goLogout)




module.exports = router;