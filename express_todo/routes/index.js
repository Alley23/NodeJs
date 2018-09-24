var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { list: db.list()});
});

// 添加
router.post('/add', function(req, res) {
  const { title, article, picUrl } = req.body;
  db.add({ title, article, picUrl});
  res.redirect('/');
})

// 删除
router.get('/del', function (req, res) {
  db.del(req.params.id);
  res.redirect('/');
})

// 获取列表数据
router.get('/get/:id', function (req, res) {
  const itemData = db.get(req.params.id)
  res.send(itemData);
})

// 修改
router.post('/update', function (req, res) {
  const { id, title, article, picUrl } = req.body;
  db.update(id, { title, article, picUrl });
  res.redirect('/');
})

module.exports = router;
