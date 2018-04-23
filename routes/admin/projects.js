var express = require('express');
var router = express.Router();

// GET /projects 所有用户或者特定用户的文章页
//   eg: GET /projects?author=xxx
router.get('/', function (req, res, next) {
  res.render('admin/projects/index',{title:'專案作品管理'})
})

//WORK /projects/create 发表一篇文章
router.get('/new', function (req, res, next) {
  res.render('admin/projects/new',{title:'新增作品'})
})

// GET /projects/create 发表文章页
router.get('/category', function (req, res, next) {
  res.render('admin/projects/category',{title:'類別管理'})
})
 

// GET /projects/:projectId 单独一篇的文章页
router.get('/:projectId', function (req, res, next) {
  res.send('文章详情页')
})

// GET /projects/:projectId/edit 更新文章页
router.get('/:projectId/edit', function (req, res, next) {
  res.send('更新文章页')
})

//WORK /projects/:projectId/edit 更新一篇文章
router.post('/:projectId/edit', function (req, res, next) {
  res.send('更新文章')
})

// GET /projects/:projectId/remove 删除一篇文章
router.get('/:projectId/remove', function (req, res, next) {
  res.send('删除文章')
})


module.exports = router;
