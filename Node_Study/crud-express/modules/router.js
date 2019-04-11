//创建路由容器
var express = require("express");
var router = express.Router();

var fs = require("fs");
//学生数据信息
var Student = require("./data.js");
var file = "./data.json";

//当用户访问/，读取数据，返回学生信息
router.get('/',function(req,res){
	Student.findAll(function(err,data){
		if (err) {
			res.send("err")
		} else {
			res.render("index.html",{
				datas:data
			})
		}
	})
})

//get访问new，显示新增页面
router.get('/new',function(req,res){
	res.render('new.html');
})

//post访问new，添加学生信息，并且重定向至首页
router.post('/new',function(req,res){
	Student.save(req.body,function(err,data){
		if (err) {
			res.send("new-page-err")
		} else {
			res.redirect("/");
		}
	})

})

//get访问edit，显示edit页面
router.get('/edit',function(req,res){
	Student.findOne(parseInt(req.query.id),function(err,data){
		if (err) {
			res.send("show-edit-err");
		} else {
			res.render('edit.html',{
				datas:data
			});
		}
	})
	
})

//post访问edit，修改学生信息，并且重定向至首页
router.post('/edit',function(req,res){
	Student.update(req.body,function(err,data){
		if (err) {
			res.send("err");
		} else {
			res.redirect("/");
		}
	})
})

//get访问delete
router.get('/delete',function(req,res){
	Student.delete(parseInt(req.query.id),function(err,data){
		if (err) {
			res.send("delete-err");
		} else {
			res.redirect("/");
		}
	})
})

module.exports = router;