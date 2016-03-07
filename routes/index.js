var settings = require('../settings');
var mysql = require('../models/db');
var async = require('async');
var debug = require('debug')('myapp:index');

exports.servicedo = function(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	var _sql = req.params.sql;
	if (_sql == "checkLogin") {
		var uname = req.param("uname");
		var pwd = req.param("pwd");
		var sql = "select * from user where username = '" + uname + "'";
		debug(sql);
		mysql.query(sql, function(err, result) {
			if (err) return console.error(err.stack);
			if (!result[0]) {
				res.send("400");
				return;
			}
			if (result[0].password == pwd) {
				res.json(result[0]);
			} else {
				res.send("400");
			}
		});
	}else if(_sql == "createBooking"){
		var bookingno = req.param("bookingno");
		var saler = req.param("saler");
		var operator = req.param("operator");
		var startDate = req.param("startDate");
		var ShipName = req.param("ShipName");
		var userid = req.param("userid");
		var sql = "insert into booking (bookingno,lastModify,userid,saler,operator,startDate,ShipName) values('"+bookingno+"',now(),"+userid+",'"+saler+"','"+operator+"','"+startDate+"','"+ShipName+"')";
		debug(sql);
		mysql.query(sql, function(err, result) {
			if (err) return console.error(err.stack);
			if(result.affectedRows == 1){
				res.send("300");
			}
		});
	}else if(_sql == "delBooking"){
		var id = req.param("id");
		var sql = "delete from booking where id = " + id;
		debug(sql);
		mysql.query(sql, function(err, result) {
			if (err) return console.error(err.stack);
			if(result.affectedRows == 1){
				res.send("300");
			}
		});
	}else if(_sql == "getBookingById"){
		var id = req.param("id");
		var sql = "select * from booking where id = " + id;
		debug(sql);
		mysql.query(sql, function(err, result) {
			if (err) return console.error(err.stack);
			res.json(result);
		});
	}else if(_sql == "getBooking"){
		var page = parseInt(req.param("indexPage"));
		var cid = parseInt(req.param("cid"));
		var LIMIT = 6;
		page = (page && page > 0) ? page : 1;
		var limit = (limit && limit > 0) ? limit : LIMIT
		var sql1 = "select * from booking where userid = "+cid+" order by lastModify desc limit " + (page - 1) * limit + "," + limit;
		var sql2 = "select count(*) as count from booking";
		debug(sql1);
		async.waterfall([function(callback) {
		    mysql.query(sql1, function(err, result) {
		        if (err) return console.error(err.stack);
		        callback(null, result);
		    });
		}, function(result, callback) {
		    mysql.query(sql2, function(err, rows) {
		       if (err) return console.error(err.stack);
		        callback(err, rows,result);
		    });
		}], function(err,rows,result) {
		    if(err){
		    	console.log(err);
		    }else{
		    	for(var i in result){
		    		result[i].lastModify = (result[i].lastModify).Format("yyyy-MM-dd hh:mm:ss");
		    	}
		    	
		    	var total = rows[0].count;
		    	var totalpage = Math.ceil(total/limit);
                var isFirstPage = page == 1 ;
                var isLastPage = ((page -1) * limit + result.length) == total;
                
		    	var ret = {
		    		total:total,
		    		totalpage:totalpage,
		    		isFirstPage:isFirstPage,
		    		isLastPage:isLastPage,
					record:result
				};
				res.json(ret);
			}
		});
	}
}

function getToday() {
	var myDate = new Date();
	var y = myDate.getFullYear();
	var m = (((myDate.getMonth() + 1) + "").length == 1) ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
	var d = (((myDate.getDate()) + "").length == 1) ? "0" + (myDate.getDate()) : (myDate.getDate());
	return y + "-" + m + "-" + d;
}

Date.prototype.Format = function(fmt) {
		var d = this;
		var o = {
			"M+": d.getMonth() + 1, //月份
			"d+": d.getDate(), //日
			"h+": d.getHours(), //小时
			"m+": d.getMinutes(), //分
			"s+": d.getSeconds(), //秒
			"q+": Math.floor((d.getMonth() + 3) / 3), //季度
			"S" : d.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
}