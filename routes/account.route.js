var express = require('express');
var router = express.Router();
const { loginGet, loginPost, registerGet,manageGet, registerPost,changepasssGet,changepassPost } = require('../controller/account.controller');
const { registerValidator, loginValidator,changePassValidator } = require('../validation/login');

/* GET users listing. */
router.get('/login', loginGet);
router.get('/register', registerGet);
router.get('/manage', manageGet);
router.get('/changepassword', changepasssGet);

router.post('/login', loginValidator, loginPost)
router.post('/register', registerValidator, registerPost)
router.post('/changepassword',changePassValidator,changepassPost);

module.exports = router;
