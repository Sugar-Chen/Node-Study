//创建路由容器
const express = require("express")
const router = express.Router()
const path = require("path")
const url = path.join(__dirname,"../../views/")


const Student = require("../../models/Student.js")//相当于导入数据库中的表

router.get('/',(req,res)=>{
	Student.find((err,data)=>{//查询所有数据
		if (err) {
			res.send("err")
		} else {
			res.render(url+"index.html",{
				datas:data
			})
		}
	})
})


router.get('/new',(req,res)=>{
	res.render(url+'new.html');
})


router.post('/new',(req,res)=>{
	new Student(req.body).save(req.body,(err)=>{//添加数据，就要new Student(待保存的数据)
		if (err) {
			res.send("new-page-err")
		} else {
			res.redirect("/");
		}
	})
})


router.get('/edit',(req,res)=>{
	Student.findById(req.query.id,(err,data)=>{//根据ID查找数据
		if (err) {
			res.send("edit-err");
		} else {
			res.render(url+'edit.html',{
				datas:data
			});
		}
	})
})

router.post('/edit',(req,res)=>{
	Student.findByIdAndUpdate(req.body.id,req.body,(err)=>{//根据ID更新数据
		if (err) {
			res.send("edit-err");
		} else {
			res.redirect("/");
		}
	})
})

router.get('/delete',(req,res)=>{
	Student.findByIdAndRemove(req.query.id,(err)=>{//根据ID删除数据
		if (err) {
			res.send("delete-err");
		} else {
			res.redirect("/");
		}
	})
})

module.exports = router;