const express = require('express');
const router = express.Router();
const app = express();
const Portfolio = require('../models/post');
const Category = require('../models/category'); 
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


router.get('/portfolio/category/:slug',(req,res)=>{
  let slug = req.params.slug;

  Category.getCategoryBySlug(slug).then(category=>{
    
    Portfolio.getPortfoliosByCateoryId(category._id).then((posts) => {
      let data  = {
        title:category.name,
        posts:posts
      }  
      res.render('category',data);      
      }); 
    }).catch((e)=>{console.log('err '+e)});
}); 

router.get('/portfolio/:id',(req,res)=>{
  
}); 

module.exports = router;