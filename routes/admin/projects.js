var express = require('express');
var router = express.Router();
const multer = require('multer');
const Category = require('../../models/category');
const Post = require('../../models/post');
var fs = require("fs");//操作文件



let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './storage/')
  },
  filename: function (req, file, cb) {
    cb(null, 'image' + '-' + Date.now() + '.jpg')
  }
})

let upload = multer({ storage: storage }).single('imageFile');




// GET /projects 所有用户或者特定用户的文章页
router.get('/', function (req, res, next) {


  Post.getPosts().then(function (result) {
    res.render('admin/projects/index', {
      title: '專案作品管理',
      posts: result,
    })

  })

})

//WORK /projects/create 发表一篇文章
router.get('/new', function (req, res, next) {

  Category.getCategories().then(function (categories) {
    res.render('admin/projects/new', {
      title: '新增作品',
      categories: categories,
      errors: req.flash('errors'),
    })
  }).catch(function (err) {
    if (err) console.log(err);
  });
})


router.post('/new', function (req, res, next) {
  
  upload(req, res, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(req.body);
    req.checkBody('projectname', 'Projectname cant be empty!!!').notEmpty();
    req.checkBody('category', 'Category cant be empty!!!').notEmpty();
    req.checkBody('description', 'Description cant be empty!!!').notEmpty();
    req.checkBody('sort', 'Sort must be a number').isDecimal();

    let errors = req.validationErrors();
    if (errors) {
      // console.log(`errors:${JSON.stringify(errors)}  `);
      req.flash('errors', errors);
      req.flash('body', req.body)


      return res.redirect('/admin/projects/new');
    } else {
      let projectname = req.body.projectname;
      let category = req.body.category;
      let description = req.body.description;
      let sort = req.body.sort;
      let imagepath;
      if (req.file !== undefined) {
        imagepath = req.file.path ? req.file.path : '';
      }

      let post = {
        name: projectname,
        categories: category,
        description: description,
        image: imagepath,
        sort: sort
      }

      Post.createPost(post);
      res.redirect('/admin/projects/');
    }
  })

})




// GET /projects/:projectId 单独一篇的文章页
router.get('/edit/:projectId', function (req, res, next) {

  let gc = Category.getCategories();
  let gp = Post.getPost(req.params.projectId);

  Promise.all([gc, gp]).then((result) => {
   
    res.render('admin/projects/edit', {
      title: '編輯作品內容',
      categories: result[0],
      errors: req.flash('errors'),
      formdata: result[1]
    });
  }).catch((err) => { console.log(err) });

});

router.post('/edit/:projectId', function (req, res, next) {
    req.checkBody('projectname', 'Projectname cant be empty!!!').notEmpty();
    req.checkBody('category', 'Category cant be empty!!!').notEmpty();
    req.checkBody('description', 'Description cant be empty!!!').notEmpty();
    req.checkBody('sort', 'Sort must be a number').isDecimal();
    console.log('body = '+JSON.stringify(req.body));
    let errors = req.validationErrors();
    if (errors) {
     
      console.log(`errors:${JSON.stringify(errors)}  `);
      req.flash('errors', errors);
      req.flash('body', req.body)
      return res.redirect('back');//<---- redirect無法傳資料
    } else {

      let projectname = req.body.projectname;
      let category = req.body.category;
      
      let description = req.body.description;
      let sort = req.body.sort;
      let imagepath= req.body.imageFile;
      
      let post = {
        name: projectname,
        categories: category,
        description: description,
        image: imagepath,
        sort: sort
      }
      Post.updatePost(req.params.projectId,post).then((result)=>{
        console.log('res '+result);
      }).catch(function(err){
        console.log('err: ', err);
        
      });
      res.redirect('/admin/projects/');
    }
  

});

router.post('/fileUploader',function(req,res){
  upload(req, res, function (err) {
    if (err) {
      return console.log('err'+ err);
    }

    // console.log('file '+req.file);
  res.send(req.file.path);
  });
});





// GET /projects/:projectId/remove 删除一篇文章
router.delete('/delete/:projectId', function (req, res) {
  let id = req.params.projectId; 
  Post.deletePost(id).then(function(result){
    res.send({success:'post has been deleted!!'});   
  } ).catch((err)=>{console.log(err)}); 
  
});


router.get('/category', function (req, res, next) {
  let category_list = [];
  Category.getCategories().then(function (categories) {
    res.render('admin/projects/category', {
      title: '類別管理',
      categories: categories
    });
  }).catch(function (err) {
    if (err) console.log(err);
  });



});
router.post('/category', function (req, res, next) {
  let categoryname = req.body.category;
  let category = {
    name: categoryname,
  }
  Category.createCategory(category);
  res.redirect('/admin/projects/category');
});

router.delete('/category/delete', function (req, res) {
  let id = req.body.id;
  Category.deleteCategory(id).then(function (result) {

  }).catch(function (error) {
    console.log('error ' + err);
  });
  return 'category has been delete!!'
});






module.exports = router;
