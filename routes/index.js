var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '홈페이지', pageName:'home.ejs'});
});


//지역검색 페이지
router.get('/search', function(req, res){
  res.render('index', {title:'지역검색', pageName:'local/search.ejs'});
})
module.exports = router;
