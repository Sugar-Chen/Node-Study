//创建路由容器
const express = require("express")
const router = express.Router()
const path = require("path")
const url = path.join(__dirname,"../../views/")

//学生数据信息
const Student = require("./data.js")

router.get('/',(req,res)=>{
	Student.findAll((err,data)=>{
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
	Student.save(req.body,(err)=>{
		if (err) {
			res.send("new-page-err")
		} else {
			res.redirect("/");
		}
	})

})


router.get('/edit',(req,res)=>{
	Student.findOne(parseInt(req.query.id),(err,data)=>{
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
	Student.update(req.body,(err)=>{
		if (err) {
			res.send("edit-err");
		} else {
			res.redirect("/");
		}
	})
})

router.get('/delete',(req,res)=>{
	Student.delete(parseInt(req.query.id),(err)=>{
		if (err) {
			res.send("delete-err");
		} else {
			res.redirect("/");
		}
	})
})

module.exports = router;