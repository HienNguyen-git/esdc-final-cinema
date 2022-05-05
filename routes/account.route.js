var express = require('express');
var router = express.Router();
const { loginGet, loginPost, registerGet,manageGet, registerPost,changepasssGet,changepassPost, getTicket, printTicket } = require('../controller/account.controller');
const { registerValidator, loginValidator,changePassValidator } = require('../validation/login');

/* GET users listing. */
router.get('/login', loginGet);
router.get('/register', registerGet);
router.get('/manage', manageGet);
router.get('/changepassword', changepasssGet);
router.get('/ticket-preview', getTicket)
// router.get('/print-ticket', printTicket)
router.get('/demo', (req,res)=>{
    res.render("account/ticket")
})
router.get('/test', (req,res)=>{
    var doc = new Pdf();
    doc.text("Hello World", 50, 50);

    doc.output( function(pdf) {
        res.type('application/pdf');
        res.end(pdf, 'binary');
    });
})

router.post('/login', loginValidator, loginPost)
router.post('/register', registerValidator, registerPost)
router.post('/changepassword',changePassValidator,changepassPost);


module.exports = router;
