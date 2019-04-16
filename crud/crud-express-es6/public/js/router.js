"use strict";

//创建路由容器
var express = require("express");

var router = express.Router();

var path = require("path");

var url = path.join(__dirname, "../../views/"); //学生数据信息

var Student = require("./data.js");

router.get('/', function (req, res) {
  Student.findAll(function (err, data) {
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
  Student.save(req.body, function (err) {
    if (err) {
      res.send("new-page-err");
    } else {
      res.redirect("/");
    }
  });
});
router.get('/edit', function (req, res) {
  Student.findOne(parseInt(req.query.id), function (err, data) {
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
  Student.update(req.body, function (err) {
    if (err) {
      res.send("edit-err");
    } else {
      res.redirect("/");
    }
  });
});
router.get('/delete', function (req, res) {
  Student["delete"](parseInt(req.query.id), function (err) {
    if (err) {
      res.send("delete-err");
    } else {
      res.redirect("/");
    }
  });
});
module.exports = router;