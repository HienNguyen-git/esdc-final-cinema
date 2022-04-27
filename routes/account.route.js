var express = require('express');
const { loginGet, loginPost, registerGet, registerPost } = require('../controller/account.controller');
const { registerValidator, loginValidator } = require('../validation/login');
var router = express.Router();

/* GET users listing. */
router.get('/login', loginGet);
router.get('/register', registerGet);

router.post('/login', loginValidator, loginPost)
router.post('/register', registerValidator, registerPost)

module.exports = router;
