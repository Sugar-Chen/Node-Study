"use strict";

//创建路由容器
var express = require("express");

var router = express.Router();

var path = require("path");

var url = path.join(__dirname, "../../views/");

var Student = require("../../models/Student.js"); //相当于导入数据库中的表


router.get('/', function (req, res) {
  Student.find(function (err, data) {
    //查询所有数据
    if (err) {
      res.send("err");
    } else {
      res.render(url + "index.html", {
        datas: data
      });
    }
  });
});
router.get('/new', function (req, res) {
  res.render(url + 'new.html');
});
router.post('/new', function (req, res) {
  new Student(req.body).save(req.body, function (err) {
    //添加数据，就要new Student(待保存的数据)
    if (err) {
      res.send("new-page-err");
    } else {
      res.redirect("/");
    }
  });
});
router.get('/edit', function (req, res) {
  Student.findById(req.query.id, function (err, data) {
    //根据ID查找数据
    if (err) {
      res.send("edit-err");
    } else {
      res.render(url + 'edit.html', {
        datas: data
      });
    }
  });
});
router.post('/edit', function (req, res) {
  Student.findByIdAndUpdate(req.body.id, req.body, function (err) {
    //根据ID更新数据
    if (err) {
      res.send("edit-err");
    } else {
      res.redirect("/");
    }
  });
});
router.get('/delete', function (req, res) {
  Student.findByIdAndRemove(req.query.id, function (err) {
    //根据ID删除数据
    if (err) {
      res.send("delete-err");
    } else {
      res.redirect("/");
    }
  });
});
module.exports = router;