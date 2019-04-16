 //构建服务器
var express = require("express");
var app = express();

var bodyParser = require("body-parser");//引入body-parser模块，解析post请求
var router = require("./modules/router.js");//导入路由设计

//绑定服务器端口
app.listen(3000,function(){
	console.log("ready...");
})


//配置静态资源的访问
app.use('/public/',express.static('./public'));
//配置body-parser
app.use(bodyParser.urlencoded(({extended:false})));
app.use(bodyParser.json());

//路由
app.use(router);
//渲染页面，配置渲染模版
app.engine('html',require("express-art-template"));