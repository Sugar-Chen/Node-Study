//只处理学生数据，不考虑业务
var fs = require("fs");
var file = "../../data.json";


//查询所有学生信息
exports.findAll = function(callback){
	fs.readFile(file,function(err,data){
		console.log(data);
		if (err) {
			callback(err,null);
		} else {
			callback(null,JSON.parse(data));
		}
	})
}

//根据id获得学生信息
// exports.findOne = function(id,callback){
// 	fs.readFile(file,function(err,data){
// 		var datas = JSON.parse(data);
// 		for (var i = 0; i < data.length; i++) {
// 			if (data[i] == id) {
// 				callback()
// 			}
// 		}
// 	})
// }