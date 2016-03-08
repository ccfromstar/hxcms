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
		var mode = req.param("mode");
		var bookingno = req.param("bookingno");
		var saler = req.param("saler");
		var operator = req.param("operator");
		var startDate = req.param("startDate");
		var ShipName = req.param("ShipName");
		var numDay = req.param("numDay");
		var txtLine = req.param("txtLine");
		var txtRoom = req.param("txtRoom");
		var numPerson = req.param("numPerson");
		var remark = req.param("remark");
		var userid = req.param("userid");
		
		var supplyfile = req.param("supplyfile");
		var supply_company = req.param("supply_company");
		var supply_name = req.param("supply_name");
		var supply_tel = req.param("supply_tel");
		var supply_total = req.param("supply_total");
		var supply_deadline = req.param("supply_deadline");
		
		/*编辑模式*/
		if(mode == "edit"){
			var sql = "update booking set ";
			sql += " lastModify = now(),";
			sql += " saler = '"+saler+"',";
			sql += " startDate = '"+startDate+"',";
			sql += " ShipName = '"+ShipName+"',";
			sql += " numDay = '"+numDay+"',";
			sql += " txtLine = '"+txtLine+"',";
			sql += " txtRoom = '"+txtRoom+"',";
			sql += " numPerson = "+numPerson+",";
			/*第3页*/
			sql += " supply_company = '"+supply_company+"',";
			sql += " supplyfile = '"+supplyfile+"',";
			sql += " supply_name = '"+supply_name+"',";
			sql += " supply_tel = '"+supply_tel+"',";
			sql += " supply_total = "+supply_total+",";
			sql += " supply_deadline = '"+supply_deadline+"',";
			
			sql += " remark = '"+remark+"'";
			sql += " where bookingno = '"+bookingno+"'";
			debug(sql);
			mysql.query(sql, function(err, result) {
				if (err) return console.error(err.stack);
				if(result.affectedRows == 1){
					res.send("300");
				}
			});
		}else{
			/*检查订单编号是否重复*/
			var sql1 = "select id from booking where bookingno = '"+bookingno+"'";
			var sql2 = "insert into booking (bookingno,lastModify,userid,saler,operator,startDate,ShipName,numDay,txtLine,txtRoom,numPerson,remark,supplyfile,";
			sql2 += "supply_company,supply_name,supply_tel,supply_total,supply_deadline)";
			sql2 += " values('"+bookingno+"',now(),"+userid+",'"+saler+"','"+operator+"','"+startDate+"','"+ShipName+"','"+numDay+"','"+txtLine+"','"+txtRoom+"',"+numPerson+",'"+remark+"','";
			sql2 += supplyfile+"','"+supply_company+"','"+supply_name+"','"+supply_tel+"',"+supply_total+",'"+supply_deadline+"')";
			debug(sql2);
			async.waterfall([function(callback) {
			    mysql.query(sql1, function(err, result) {
			        if (err) return console.error(err.stack);
			        var hasd = result[0]?"400":null;
			        callback(hasd, result);
			    });
			}, function(result, callback) {
			    mysql.query(sql2, function(err, rows) {
			       if (err) return console.error(err.stack);
			        callback(err, rows);
			    });
			}], function(err,rows) {
			    if(err){
			    	res.send(err);
			    }else{
			    	if(rows.affectedRows == 1){
						res.send("300");
					}
				}
			});	
		}
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
			var r = result[0].remark;
			if(r){
				result[0].remark = r.replace(/\n/g,"<br/>");
			}
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
	}else if(_sql == "uploaddo"){
		res.setHeader("Access-Control-Allow-Origin", "*");
		var fname = req.files.fileUp.path.replace("public\\files\\", "").replace("public/files/", "");
		res.writeHead(200, {'Content-type' : 'text/html'});
		res.write('<script>');
		res.write('window.parent.postMessage("'+fname+'","*");');
		res.end('</script>');
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