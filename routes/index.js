var express = require('express');
var router = express.Router();
const dietvirus = require('sanitize-html');
var MyPost = require('../models/mypost.js')
//Login thanh cong
router.get('*',function(req,res,next){
    res.locals.userId = req.session.userId
    next();
})
// Home
router.get('/', function (req, res, next) {
  res.redirect('/1')
});
//Page
router.get("/:page", function (req, res, next) {
  let perPage = 3;
  let page = req.params.page || 1;
  MyPost
  .find()
  .skip((perPage * page) - perPage)
  .limit(perPage)
  .exec((err, tatcabaiviet) => {
    MyPost.countDocuments((err, count) => {
      if (err) return next(err)
      res.render('index.ejs', {
        tatcabaiviet, // sản phẩm trên một page
        current:page, // page hiện tại
        pages: Math.ceil(count / perPage) // tổng số các page
      })
    })
  })
});


// Check it
function kiemtrahople(req, res, next) {
 if (!req.body.username|| !req.body.title || !req.body.subtitle || !req.body.content  || !req.files ) {
  return res.redirect('/taomoi')
 }
 next()
}
// || !req.files || !req.body.username
router.use('/them', kiemtrahople)
//Add Post

router.post('/them', function (req, res, next) {
  // sampleFile.mv(uploadPath, function (err) {
    //   nd = req.body.conntent.replaceAll('<p>&nbsp</p>','').trim()
    //   nd = req.body.content.replaceAll('<p>&nbsp;</p>','').trim() 
    
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    nd = req.body.content.split('<p>&nbsp;</p>').join('').trim()
    var sampleFile = req.files.sampleFile;
    var uploadPath = 'public/posts/' + sampleFile.name;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err){
      if (err)
        return res.status(500).send(err);
      var mp = new MyPost({
      title: req.body.title,
      username: req.body.username,
      subtitle: req.body.subtitle,
      content: dietvirus(nd),
      image: sampleFile.name
    });
    mp.save(error => res.redirect('/'))
  })
});

// review post
router.get('/baiviet/:mabaiviet', function (req, res, next) {
  MyPost.findOne(
    { _id: req.params.mabaiviet },
    (error, baiviet) => {
      res.render('post.ejs', { baiviet });
    }
    )
});
// Page Contact
router.get('/lienhe', function (req, res, next) {
  res.render('contact')
})
//Page About
router.get('/gioithieu', function (req, res, next) {
  res.render('about.ejs');
});

module.exports = router;






