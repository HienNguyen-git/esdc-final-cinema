var express = require('express');
const { loginGet, loginPost } = require('../controller/account.controller');
const { registerValidator } = require('../validation/login');
var router = express.Router();

/* GET users listing. */
router.get('/login', loginGet);

router.post('/login',registerValidator, loginPost)

module.exports = router;
