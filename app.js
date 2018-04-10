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
const app = express();
const pkg = require('./package');
  var db = mongoose.createConnection('mongodb://localhost/localhost'); //创建一个数据库连接
 db.on('error',console.error.bind(console,'连接错误:'));
 db.once('open',function(){
     //一次打开记录
   });

   var PersonSchema = new mongoose.Schema({
    name:String   //定义一个属性name，类型为String
  });
  var CashSchema = new mongoose.Schema({
   money:String   //定义一个属性name，类型为String
 });
   var PersonModel = db.model('Person',PersonSchema);
   var CashModel = db.model('Money',CashSchema);
   var personEntity = new PersonModel({name:'Krouky'});
   var CashEntity = new CashModel({money:'1000'});
   personEntity.save();
   CashEntity.save();
     //打印这个实体的名字看看
     console.log(personEntity.name); //Krouky


// view engine setup
// process.env.NODE_ENV = 'production';
// console.log(process.env.NODE_ENV);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//set static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
