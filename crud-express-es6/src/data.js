//处理学生数据
const fs = require("fs");
const path = require("path");
const file = path.join(__dirname,"../../data.json");


exports.findAll = (callback)=>{
	fs.readFile(file,(err,data)=>{
		if (err) {
			callback(err,null);
		} else {
			callback(null,JSON.parse(data));
		}
	})
}

exports.save = (newData,callback)=>{
	fs.readFile(file,(err,data)=>{
		if (err) {
			callback(err);
		} else {
			let localData = JSON.parse(data);
			newData.id = localData[localData.length-1].id + 1;
			newData.hobbies = newData.hobbies.split(",");
			localData.push(newData);
			
			const fileData = JSON.stringify(localData);
			fs.writeFile(file,fileData,(err)=>{
				if (err) {
					callback(err);
				} else {
					callback(null);
				}
			})
		}
	})
}


exports.findOne = (id,callback)=>{
	fs.readFile(file,(err,data)=>{
		if (err) {
			callback(err,null);
		} else {
			const localData = JSON.parse(data);
			for (let i = 0; i < localData.length; i++) {
				if (localData[i].id == id) {
					callback(null,localData[i]);
				}
			}
		}
	})
}

exports.update = (pushData,callback)=>{
	fs.readFile(file,function(err,data){
		if (err) {
			callback(err,null);
		} else {
			pushData.id = parseInt(pushData.id);
			pushData.hobbies = pushData.hobbies.split(",");
			if (pushData.hobbies[pushData.hobbies.length-1] == "") {
				pushData.hobbies.pop();
			}
			let localData = JSON.parse(data);
			for (let i = 0; i < localData.length; i++) {
				if (localData[i].id == pushData.id) {
					for(let key in localData[i]){
						localData[i][key] = pushData[key];
					}
				}
			}

			const fileData = JSON.stringify(localData);
			fs.writeFile(file,fileData,(err)=>{
				if (err) {
					callback(err);
				} else {
					callback(null);
				}
			})
		}
	})
}

exports.delete = (id,callback)=>{
	fs.readFile(file,(err,data)=>{
		if (err) {
			callback(err);
		} else {
			let localData = JSON.parse(data);
			for (let i = 0; i < localData.length; i++) {
				if(localData[i].id == id){
					localData.splice(i,1);
					break;
				}
			}
			const fileData = JSON.stringify(localData);
			fs.writeFile(file,fileData,(err)=>{
				if (err) {
					callback(err);
				} else {
					callback(null);
				}
			})
		}
	})
}




