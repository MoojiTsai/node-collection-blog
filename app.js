const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const conf = require('./config/default'),
      config = conf() ;
      // console.log('config: ', config);
const app = express();
const router = express.Router();
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin/admin');
const pkg = require('./package');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressValidator = require('express-validator');
const engine = require('ejs-mate'); 
var cloudinary = require('cloudinary');


// view engine setup

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//set static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/storage',express.static(path.join(__dirname, 'storage')));
app.use('/bower_components',  express.static(path.join(__dirname, 'bower_components')));
app.use(flash());

app.use(logger('dev'));
app.use(cookieParser());
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
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


app.use(passport.initialize());
app.use(passport.session()); // 一定要在 initialize 之後


app.use('/', indexRouter);
app.use('/admin', adminRouter);





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

cloudinary.config({ 
  cloud_name: config.cloudary.CLOUD_NAME, 
  api_key: config.cloudary.CLOUD_KEY,
  api_secret: config.cloudary.CLOUD_SECRET
});

// error handler
app.use(function (err, req, res, next) {
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
