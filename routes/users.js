var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt")
var User = require('../models/user');
// confirm
router.post("/dangnhap",function(req,res,next){
    var {email,password} = req.body
    User.findOne({ email }, function (err, nguoidung) {
        if (nguoidung) {
            bcrypt.compare(password, nguoidung.password, (err, same) => {
                if (same)
                    req.session.userId= nguoidung._id,
                    res.redirect('/')
                else
                    res.redirect('/users/dangnhap')
            })
        }
        else
            res.redirect('/users/dangnhap')
    })
});
//create new post
router.get('/taomoi', function (req, res, next) {
if (req.session.userId){
  return res.render("create.ejs")
}
res.redirect("/users/dangnhap");
});
// Page Login
router.get("/dangnhap",function(req,res,next){
  res.render('login.ejs')
})

// //resgiter
router.get("/dangky", function (req, res, next) {
    res.render("register.ejs")
})
function kiemtrahople(req, res, next) {
    if (!req.body.username || !req.body.password || !req.body.email)
        res.redirect('/users/dangky')
    else
        next()
}
router.post("/dangky", kiemtrahople, function (req, res, next) {
        var nguoidung = new User(req.body)
        nguoidung.save(error => {
            if (error)
            return res.redirect('/users/dangky')
            else
            return res.redirect('/')
        })
    })
    
    // Loout
router.get('/dangxuat',function(req,res,next){
  req.session.userId = undefined
  res.redirect('/')
})

/* GET users listing. */

module.exports = router;
