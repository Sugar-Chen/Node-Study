//创建路由容器
var express = require("express");
var router = express.Router();

var fs = require("fs");
//学生数据信息
var Student = require("./module/data.js");
var file = "./data.json";


//当用户访问/，读取数据，返回学生信息
router.get('/',function(req,res){
	//读取文件信息，添加到首页
	fs.readFile(file,function(err,data){
		if(err){
			res.send("err");
		}else{
			res.render('index.html',{
				datas:JSON.parse(data)
			});
		}
	})
})
//get访问new，显示新增页面
router.get('/new',function(req,res){
	res.render('new.html');
})

//post访问new，添加学生信息，并且重定向至首页
router.post('/new',function(req,res){

	fs.readFile(file,function(err,data){
		if (err) {
			res.send("err");
		} else {
			//将读取到的二进制数据转化成json对象
			var result = JSON.parse(data);
			//将数据req.body写入datas中
			var detail= req.body;
			detail.id = result[result.length-1].id + 1;
			detail.hobbies = detail.hobbies.split(",");//保证传入的是数组
			result.push(detail);

			//将json对象，转化为"字符串"，写入文件
			var fileData = JSON.stringify(result);
			fs.writeFile(file,fileData,function(err){
				if (err) {
					res.send(err);
				}else{
					//写入成功，重定向至首页
					res.redirect('/');
				}
			})
		}
	})
})

//get访问edit，显示edit页面
router.get('/edit',function(req,res){
	//edit?id
	//获取当前用户的id，将用户的信息绑定到页面
	//req.query用来获取get提交的信息中？后面的内容，并转换成对象；在这是{id:..};
	var id = req.query.id;
	//通过id获取学生信息，绑定到页面
	fs.readFile(file,function(err,data){
		if (err) {
			res.send("err");
		} else {
			var fileData = JSON.parse(data);
			for (var i = 0; i < fileData.length; i++) {
				if(fileData[i].id == id){
					res.render('edit.html',{
						datas:fileData[i]
					});
				}
			}
		}
	})
	
})

//post访问edit，修改学生信息，并且重定向至首页
router.post('/edit',function(req,res){
	//获取修改后的学生信息，更新现有文件的学生信息
	fs.readFile(file,function(err,data){
		if (err) {
			res.send("err");
		} else {
			var pushData = req.body;
			pushData.id = parseInt(pushData.id);
			pushData.hobbies = pushData.hobbies.split(",");
			pushData.hobbies.pop();

			var datas = JSON.parse(data);
			for (var i = 0; i < datas.length; i++) {
				if (datas[i].id == pushData.id) {
					for(var key in datas[i]){
						datas[i][key] = pushData[key];
					}
				}
			}

			var fileData = JSON.stringify(datas);
			fs.writeFile(file,fileData,function(err){
				if (err) {
					res.send(err);
				} else {
					res.redirect('/');
				}
			})
		}
	})
})

//get访问delete
router.get('/delete',function(req,res){
	//delete?id
	//获取当前用户的id，将用户的信息删除
	//req.query用来获取get提交的信息中？后面的内容，并转换成对象；在这是{id:..};
	var id = req.query.id;
	//通过id获取学生信息
	fs.readFile(file,function(err,data){
		if (err) {
			res.send("err");
		} else {
			var datas = JSON.parse(data);
			for (var i = 0; i < datas.length; i++) {
				if(datas[i].id == id){
					datas.splice(i,1);
					break;
				}
			}
			var fileData = JSON.stringify(datas);
			fs.writeFile(file,fileData,function(err){
				if (err) {
					res.send(err);
				} else {
					res.redirect("/");
				}
			})
		}
	})
})
module.exports = router;