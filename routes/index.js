const express = require('express');
const router = express.Router();
const app = express();
const Portfolio = require('../models/post');
/* GET home page. */
router.get('/', function (req, res) {

  Portfolio.getPortfolios({featured:true}).then((posts) => {
    data = {
      title: '縮小檢視工作室',
      posts: posts,
    }
    return res.render('index', data);
  }).catch((e)=>{console.log('err '+e)});

});


router.get('/portofolio/:category',(req,res)=>{
  let category = req.params.category; 
  
  Portfolio.getPortfoliosByCateory(category).then((posts) => {
    console.log('posts: ', posts);
    let data  = {
      title:category,
      posts:posts
    } 
    res.render('category',data);
  }).catch((e)=>{console.log('err '+e)});

}); 

module.exports = router;
