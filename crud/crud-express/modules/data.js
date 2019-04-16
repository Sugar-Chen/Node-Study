//只处理学生数据，不考虑业务
var fs = require("fs");
var path = require("path");
var file = path.join(__dirname,"../data.json");


//查询所有学生信息
exports.findAll = function(callback){
	fs.readFile(file,function(err,data){
		if (err) {
			callback(err,null);
		} else {
			callback(null,JSON.parse(data));
		}
	})
}

//保存学生信息
exports.save = function(newData,callback){
	//更新本地数据
	fs.readFile(file,function(err,data){
		if (err) {
			callback(err);
		} else {
			var localData = JSON.parse(data);
			//用户提交的数据
			newData.id = localData[localData.length-1].id + 1;
			newData.hobbies = newData.hobbies.split(",");//保证传入的是数组
			localData.push(newData);
			//将更新后的本地数据保存
			var fileData = JSON.stringify(localData);
			fs.writeFile(file,fileData,function(err){
				if (err) {
					callback(err);
				} else {
					callback(null);
				}
			})
		}
	})
}

//编辑页面信息，根据id获得学生信息
exports.findOne = function(id,callback){
	//读取文件，返回待查找的学生信息
	fs.readFile(file,function(err,data){
		if (err) {
			callback(err,null);
		} else {
			var localData = JSON.parse(data);
			for (var i = 0; i < localData.length; i++) {
				if (localData[i].id == id) {
					callback(null,localData[i]);
				}
			}
		}
	})
}

//更新学生信息
exports.update = function(pushData,callback){
	//获取修改后的学生信息，更新现有文件的学生信息
	fs.readFile(file,function(err,data){
		if (err) {
			callback(err,null);
		} else {
			pushData.id = parseInt(pushData.id);
			pushData.hobbies = pushData.hobbies.split(",");
			if (pushData.hobbies[pushData.hobbies.length-1] == "") {
				pushData.hobbies.pop();
			}
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
					callback(err,null);
				} else {
					callback(null,null);
				}
			})
		}
	})
}

//删除学生信息
exports.delete = function(id,callback){
	fs.readFile(file,function(err,data){
		if (err) {
			callback(err,null);
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
					callback(err,null);
				} else {
					callback(null,null);
				}
			})
		}
	})
}




