"use strict";

//处理学生数据
var fs = require("fs");

var path = require("path");

var file = path.join(__dirname, "../../data.json");

exports.findAll = function (callback) {
  fs.readFile(file, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, JSON.parse(data));
    }
  });
};

exports.save = function (newData, callback) {
  fs.readFile(file, function (err, data) {
    if (err) {
      callback(err);
    } else {
      var localData = JSON.parse(data);
      newData.id = localData[localData.length - 1].id + 1;
      newData.hobbies = newData.hobbies.split(",");
      localData.push(newData);
      var fileData = JSON.stringify(localData);
      fs.writeFile(file, fileData, function (err) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  });
};

exports.findOne = function (id, callback) {
  fs.readFile(file, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      var localData = JSON.parse(data);

      for (var i = 0; i < localData.length; i++) {
        if (localData[i].id == id) {
          callback(null, localData[i]);
        }
      }
    }
  });
};

exports.update = function (pushData, callback) {
  fs.readFile(file, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      pushData.id = parseInt(pushData.id);
      pushData.hobbies = pushData.hobbies.split(",");

      if (pushData.hobbies[pushData.hobbies.length - 1] == "") {
        pushData.hobbies.pop();
      }

      var localData = JSON.parse(data);

      for (var i = 0; i < localData.length; i++) {
        if (localData[i].id == pushData.id) {
          for (var key in localData[i]) {
            localData[i][key] = pushData[key];
          }
        }
      }

      var fileData = JSON.stringify(localData);
      fs.writeFile(file, fileData, function (err) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  });
};

exports["delete"] = function (id, callback) {
  fs.readFile(file, function (err, data) {
    if (err) {
      callback(err);
    } else {
      var localData = JSON.parse(data);

      for (var i = 0; i < localData.length; i++) {
        if (localData[i].id == id) {
          localData.splice(i, 1);
          break;
        }
      }

      var fileData = JSON.stringify(localData);
      fs.writeFile(file, fileData, function (err) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  });
};