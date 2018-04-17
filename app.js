const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config-lite')(__dirname);
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const formidable = require('express-formidable');
const app = express();
const router = express.Router();
const pkg = require('./package');


  // var PostModel = db.model('Post',{
  //    name: String,
  //    title:  String,
  //    author: String,
  //    body:   String,
  //    date: { type: Date, default: Date.now },
  //    hidden: Boolean,
  // });



  // var postEntity = new PostModel(
  //   {name:'Krouky',
  //    title:'my turbo life',
  //    body:'全家現在也可以報電話末三碼喔～只是有些物流末三碼不會顯示在櫃檯電腦資料一般蝦皮跟其他拍賣基本上都可以依照號碼查了',
  //    hidden:false
  //  });

  // console.log(postEntity.name);






// view engine setup
// process.env.NODE_ENV = 'production';
// console.log(process.env.NODE_ENV);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//set static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(formidable({
  uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
  keepExtensions: true// 保留后缀
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
router.use('/', indexRouter);
router.use('/signup', require('./routes/signup'));
router.use('/signin', require('./routes/signin'));
router.use('/signout', require('./routes/signout'));
router.use('/admin', adminRouter);
router.use('/users', usersRouter);
app.use(router);

app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));


app.use(cookieParser('keyboard cat'));





// catch 404 and forward to error handler
// app.use(function(req, res, next) {
  // next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})

module.exports = app;
