var express = require('express');
var router = express.Router();

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
  res.render('admin/works',{title:'作品管理'})
})

// POST /posts/create 发表一篇文章
router.post('/create', function (req, res, next) {
  res.send('发表文章')
})

// GET /posts/create 发表文章页
router.get('/create', function (req, res, next) {
  res.send('发表文章页')
})

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', function (req, res, next) {
  res.send('文章详情页')
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', function (req, res, next) {
  res.send('更新文章页')
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', function (req, res, next) {
  res.send('更新文章')
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', function (req, res, next) {
  res.send('删除文章')
})


module.exports = router;
