var express = require('express');
var router = express.Router();
const multer = require('multer');
var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
const Category = require('../../models/category');
const Portfolio = require('../../models/post');
var fs = require("fs");//操作文件



// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {

//     cb(null, './storage/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, 'image' + '-' + Date.now() + '.jpg')
//   }
// })


let storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'colecton-photos',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, 'image' + '-' + Date.now() + '.jpg');
  }
});

let upload = multer({ storage: storage }).single('imageFile');




// GET /portfolios 所有用户或者特定用户的文章页
router.get('/', function (req, res, next) {

  var isAjaxRequest = req.headers['x-requested-with'];


  Portfolio.getPortfolios().populate('categories').exec((err, posts) => {
    if (err) { console.log(err) }
    console.log(posts)
    //送出整理好的資料
  
    
      if (isAjaxRequest == 'XMLHttpRequest') {

        res.send({
          posts: posts,
        })
      } else {
        res.render('admin/portfolios/index', {
          title: '專案作品管理',
          posts: posts,
        })

      }
    

  });;



});

//WORK /portfolios/create 发表一篇文章
router.get('/new', function (req, res, next) {

  Category.getCategories().then(function (categories) {
    res.render('admin/portfolios/new', {
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
    console.log(req.file.url);
    req.checkBody('portfolioname', 'Name cant be empty!!!').notEmpty();
    req.checkBody('category', 'Category cant be empty!!!').notEmpty();
    req.checkBody('description', 'Description cant be empty!!!').notEmpty();
    req.checkBody('sort', 'Sort must be a number').isDecimal();

    let errors = req.validationErrors();
    if (errors) {
      // console.log(`errors:${JSON.stringify(errors)}  `);
      req.flash('errors', errors);
      req.flash('body', req.body)


      return res.redirect('/admin/portfolios/new');
    } else {
      let portfolioname = req.body.portfolioname;
      let category = req.body.category;
      let description = req.body.description;
      let sort = req.body.sort;
      let imagepath = req.file.url;
      // if (req.file !== undefined) {
      //   imagepath = req.file.path ? req.file.path : '';
      // }

      let portfolio = {
        name: portfolioname,
        categories: category,
        description: description,
        image: imagepath,
        sort: sort
      }

      Portfolio.createPortfolio(portfolio);
      res.redirect('/admin/portfolios/');
    }
  })

});


router.get('/featured', function (req, res, next) {
  var isAjaxRequest = req.headers['x-requested-with'];
  // console.log('isAjaxRequest: ',  );
  Portfolio.getPortfolios().populate('categories').exec((err, posts) => {
  if (isAjaxRequest == 'XMLHttpRequest') {
      return res.send({
        posts: posts,
      });
  } else {

    return res.render('admin/portfolios/featured', {
      title: '精選作品',
      posts: posts,
    });
  }
});
});

router.post('/featured', function (req, res, next) {
  let ids = req.body.ids;
  // console.log('ids: ', ids);
  let setFalse = new Promise((res, rej) => {
    Portfolio.updatePortfolioWithOps({}, { featured: false }, { multi: true })
      .catch(e => { console.log(e); rej(); });
    res();
  });

  let updateData = new Promise((res, rej) => {
    // console.log('id ='+ ids);
    ids.forEach(id => {
      Portfolio.updatePortfolio({ _id: id }, { featured: true })
        .catch(e => {
          rej();
          console.log(e)
        });
    });
    res();
  });

  Promise.all([setFalse, updateData]).then(result => {

    return res.send({ msg: '精選文章已更新！' });
  }).catch(e => { console.log(e) });



});


// GET /portfolios/:portfolioId 单独一篇的文章页
router.get('/edit/:portfolioId', function (req, res, next) {

  let gc = Category.getCategories();
  let gp = Portfolio.getPortfolio(req.params.portfolioId);

  Promise.all([gc, gp]).then((result) => {

    res.render('admin/portfolios/edit', {
      title: '編輯作品內容',
      categories: result[0],
      errors: req.flash('errors'),
      formdata: result[1]
    });
  }).catch((err) => { console.log(err) });

});

router.post('/edit/:portfolioId', function (req, res, next) {
  req.checkBody('portfolioname', 'Name cant be empty!!!').notEmpty();
  req.checkBody('category', 'Category cant be empty!!!').notEmpty();
  req.checkBody('description', 'Description cant be empty!!!').notEmpty();
  req.checkBody('sort', 'Sort must be a number').isDecimal();
  // console.log('body = '+JSON.stringify(req.body));
  let errors = req.validationErrors();
  if (errors) {

    console.log(`errors:${JSON.stringify(errors)}  `);
    req.flash('errors', errors);
    req.flash('body', req.body)
    return res.redirect('back');//<---- redirect無法傳資料
  } else {

    let portfolioname = req.body.portfolioname;
    let category = req.body.category;

    let description = req.body.description;
    let sort = req.body.sort;
    let imagepath = req.body.imageFile;

    let portfolio = {
      name: portfolioname,
      categories: category,
      description: description,
      image: imagepath,
      sort: sort
    }
    Portfolio.updatePortfolio(req.params.portfolioId, portfolio).then((result) => {
      // console.log('res '+result);
    }).catch(function (err) {
      console.log('err: ', err);

    });
    res.redirect('/admin/portfolios/');
  }


});

router.post('/fileUploader', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return console.log('err' + err);
    }

    console.log('file ' + req.file.url);
    res.send(req.file.url);
  });
});





// GET /portfolios/:portfolioId/remove 删除一篇文章
router.delete('/delete/:portfolioId', function (req, res) {
  let id = req.params.portfolioId;
  Portfolio.deletePortfolio(id).then(function (result) {
    res.send({ success: 'post has been deleted!!' });
  }).catch((err) => { console.log(err) });

});


router.get('/category', function (req, res, next) {
  let category_list = [];
  Category.getCategories().then(function (categories) {
    res.render('admin/portfolios/category', {
      title: '類別管理',
      categories: categories
    });
  }).catch(function (err) {
    if (err) console.log(err);
  });
});

router.post('/category', function (req, res, next) {
  let categoryname = req.body.category;
  let categoryslug = req.body.slug.toLowerCase(); 
  let category = {
    name: categoryname.trim(),
    slug:categoryslug.trim()
  }
  Category.createCategory(category);
  res.redirect('/admin/portfolios/category');
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
