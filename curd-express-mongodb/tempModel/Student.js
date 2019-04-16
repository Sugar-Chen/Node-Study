const mongoose = require("mongoose")//链接数据库
mongoose.connect("mongodb://localhost/students")
	.then(()=>{
		console.log("db is connected")
	})
	.catch(err=>{
		console.log(err)
	})


const Schema = mongoose.Schema
const StudentSchema = new Schema({//设计表结构，表中数据的约束
	name:{
		type:String,
		required:true
	},
	age:{
		type:Number,
		required:true
	},
	words:{
		type:String
	},
	school:{
		type:String
	}
})

module.exports = mongoose.model('StuData',StudentSchema)
//生成表模型，这句话执行完成，相当于建了一个空表，并将空表返回