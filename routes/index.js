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
		var profit = req.param("profit");
		var profitRate = req.param("profitRate");
		var remark = req.param("remark");
		var userid = req.param("userid");
		var editid = req.param("editid");
		
		var supplyfile = req.param("supplyfile");
		var supply_company = req.param("supply_company");
		var supply_name = req.param("supply_name");
		var supply_tel = req.param("supply_tel");
		var supply_total = req.param("supply_total");
		var supply_deadline = req.param("supply_deadline");
		
		var buy_type = req.param("buy_type");
		var buy_contract = req.param("buy_contract");
		var buy_invoice = req.param("buy_invoice");
		
		var buy_company = req.param("buy_company");
		var buy_name = req.param("buy_name");
		var buy_tel = req.param("buy_tel");
		var buy_total = req.param("buy_total");
		var buy_deadline = req.param("buy_deadline");
		var buy_contractNo = req.param("buy_contractNo");
		var buy_invoiceHead = req.param("buy_invoiceHead");
		
		
		var sp_type = req.param("sp_type");
		var sp_paydate = req.param("sp_paydate");
		var sp_paynum = req.param("sp_paynum");
		var sp_payer = req.param("sp_payer");
		var sp_geter = req.param("sp_geter");
		
		var by_type = req.param("by_type");
		var by_paydate = req.param("by_paydate");
		var by_paynum = req.param("by_paynum");
		var by_payer = req.param("by_payer");
		var by_geter = req.param("by_geter");

		var buy_insure = req.param("buy_insure");
		var buy_insureHead = req.param("buy_insureHead");
		
		var fin_change = req.param("fin_change");
		var fin_invoice = req.param("fin_invoice");
		var fin_month = req.param("fin_month");
		var fin_nohx = req.param("fin_nohx");
		var fin_remark = req.param("fin_remark");
		
		var numSupply = req.param("numSupply");
		var numBuy = req.param("numBuy");
		var buyfile = req.param("buyfile");
		
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
			sql += " profit = "+profit+",";
			sql += " profitRate = "+profitRate+",";
			/*第2页*/
			sql += " buy_type = '"+buy_type+"',";
			sql += " buy_contract = '"+buy_contract+"',";
			sql += " buy_invoice = '"+buy_invoice+"',";
			sql += " buy_company = '"+buy_company+"',";
			sql += " buy_name = '"+buy_name+"',";
			sql += " buy_tel = '"+buy_tel+"',";
			sql += " buy_total = '"+buy_total+"',";
			sql += " buy_deadline = '"+buy_deadline+"',";
			sql += " buy_contractNo = '"+buy_contractNo+"',";
			sql += " buy_invoiceHead = '"+buy_invoiceHead+"',";
			sql += " buy_insure = '"+buy_insure+"',";
			sql += " buy_insureHead = '"+buy_insureHead+"',";
			sql += " buyfile = '"+buyfile+"',";
			/*第3页*/
			sql += " supply_company = '"+supply_company+"',";
			sql += " supplyfile = '"+supplyfile+"',";
			sql += " supply_name = '"+supply_name+"',";
			sql += " supply_tel = '"+supply_tel+"',";
			sql += " supply_total = '"+supply_total+"',";
			sql += " supply_deadline = '"+supply_deadline+"',";
			sql += " numSupply = "+numSupply+",";
			/*第4页*/
			sql += " fin_change = '"+fin_change+"',";
			sql += " fin_invoice = '"+fin_invoice+"',";
			sql += " fin_month = '"+fin_month+"',";
			sql += " fin_nohx = '"+fin_nohx+"',";
			sql += " fin_remark = '"+fin_remark+"',";
			
			sql += " remark = '"+remark+"'";
			sql += " where id = "+editid;
			debug(sql);
			var sql1 = "delete from supplyrecord where bookingid = "+ editid;
			var sql2 = "delete from buyrecord where bookingid = "+ editid;
			debug(sql2);
			async.waterfall([function(callback) {
				/*更新booking*/
			    mysql.query(sql, function(err, result) {
			        if (err) return console.error(err.stack);
			        var hasd = (result.affectedRows == 1)?null:"400";
			        callback(hasd, result);
			    });
			}, function(result, callback) {
				/*删除上家信息*/
			    mysql.query(sql1, function(err, rows) {
			       if (err) return console.error(err.stack);
			       if(rows.affectedRows > 0){
			       		callback(err, rows);
			       }
			    });
			}, function(rows, callback) {
				/*删除下家信息*/
			    mysql.query(sql2, function(err, rows) {
			       if (err) return console.error(err.stack);
			       if(rows.affectedRows > 0){
			       		callback(err, rows);
			       }
			    });
			}, function(rows, callback) {
			    /*保存上家信息记录*/
			   	var arr1 = sp_type.split("@");
			   	var arr2 = sp_paydate.split("@");
			   	var arr3 = sp_paynum.split("@");
			   	var arr4 = sp_payer.split("@");
			   	var arr5 = sp_geter.split("@");
			   	var arrsql = [];
			   	for(var i=0;i<arr1.length;i++){
			   		arrsql.push("insert into supplyrecord (bookingid,sp_type,sp_paydate,sp_paynum,sp_payer,sp_geter) values ("+editid+",'"+arr1[i]+"','"+arr2[i]+"','"+arr3[i]+"','"+arr4[i]+"','"+arr5[i]+"');");
			   	}
			   	async.eachSeries(arrsql, function (item, callback) {
				    debug(item);
				    mysql.query(item, function (err, res) {
				    	if(res.affectedRows == 1){
				        	callback(err, res);
				       	}else{
				       		callback('error', res);
				       	}
				    });
				}, function (err) {
				   callback(err, rows);
				});
			}, function(rows, callback) {
			    /*保存下家信息记录*/
			   	var arr1 = by_type.split("@");
			   	var arr2 = by_paydate.split("@");
			   	var arr3 = by_paynum.split("@");
			   	var arr4 = by_payer.split("@");
			   	var arr5 = by_geter.split("@");
			   	var arrsql = [];
			   	var sqli = "";
			   	for(var i=0;i<arr1.length;i++){
			   		sqli = "insert into buyrecord (bookingid,by_type,by_paydate,by_paynum,by_payer,by_geter) values ("+editid+",'"+arr1[i]+"','"+arr2[i]+"','"+arr3[i]+"','"+arr4[i]+"','"+arr5[i]+"');";
			   		arrsql.push(sqli);
			   		debug(sqli);
			   	}
			   	async.eachSeries(arrsql, function (item, callback) {
				    debug(item);
				    mysql.query(item, function (err, res) {
				    	if(res.affectedRows == 1){
				        	callback(err, res);
				       	}else{
				       		callback('error', res);
				       	}
				    });
				}, function (err) {
				   callback(err, rows);
				});
			}], function(err,rows) {
			    if(err){
			    	res.send(err);
			    	debug(err);
			    }else{
			    	res.send("300");
				}
			});	
		}else{
			/*检查订单编号是否重复*/
			var insertId = null;
			var sql1 = "select id from booking where bookingno = '"+bookingno+"'";
			var sql2 = "insert into booking (bookingno,lastModify,userid,saler,operator,startDate,ShipName,numDay,txtLine,txtRoom,numPerson,remark,supplyfile,";
			sql2 += "supply_company,supply_name,supply_tel,supply_total,supply_deadline,numSupply,";
			sql2 += "buy_type,buy_company,buy_name,buy_tel,buy_total,buy_deadline,buy_contractNo,buy_invoiceHead,buy_contract,buy_invoice,profit,profitRate,fin_change,fin_invoice,fin_month,fin_nohx,fin_remark,buy_insure,buy_insureHead,buyfile)";
			sql2 += " values('"+bookingno+"',now(),"+userid+",'"+saler+"','"+operator+"','"+startDate+"','"+ShipName+"','"+numDay+"','"+txtLine+"','"+txtRoom+"',"+numPerson+",'"+remark+"','";
			sql2 += supplyfile+"','"+supply_company+"','"+supply_name+"','"+supply_tel+"','"+supply_total+"','"+supply_deadline+"',"+numSupply;
			sql2 += ",'"+buy_type+"','"+buy_company+"','"+buy_name+"','"+buy_tel+"','"+buy_total+"','"+buy_deadline+"','"+buy_contractNo+"','"+buy_invoiceHead+"','"+buy_contract+"','"+buy_invoice+"',"+profit+","+profitRate+",'"+fin_change+"','"+fin_invoice+"','"+fin_month+"','"+fin_nohx+"','"+fin_remark+"','"+buy_insure+"','"+buy_insureHead+"','"+buyfile+"')";
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
			}, function(rows, callback) {
			    /*保存上家信息记录*/
			   	var arr1 = sp_type.split("@");
			   	var arr2 = sp_paydate.split("@");
			   	var arr3 = sp_paynum.split("@");
			   	var arr4 = sp_payer.split("@");
			   	var arr5 = sp_geter.split("@");
			   	var arrsql = [];
			   	insertId = rows.insertId;
			   	for(var i=0;i<arr1.length;i++){
			   		arrsql.push("insert into supplyrecord (bookingid,sp_type,sp_paydate,sp_paynum,sp_payer,sp_geter) values ("+insertId+",'"+arr1[i]+"','"+arr2[i]+"','"+arr3[i]+"','"+arr4[i]+"','"+arr5[i]+"');");
			   	}
			   	async.eachSeries(arrsql, function (item, callback) {
				    debug(item);
				    mysql.query(item, function (err, res) {
				    	if(res.affectedRows == 1){
				        	callback(err, res);
				       	}else{
				       		callback('error', res);
				       	}
				    });
				}, function (err) {
				   callback(err, rows);
				});
			}, function(rows, callback) {
			    /*保存下家信息记录*/
			   	var arr1 = by_type.split("@");
			   	var arr2 = by_paydate.split("@");
			   	var arr3 = by_paynum.split("@");
			   	var arr4 = by_payer.split("@");
			   	var arr5 = by_geter.split("@");
			   	var arrsql = [];
			   	var sqli = "";
			   	for(var i=0;i<arr1.length;i++){
			   		sqli = "insert into buyrecord (bookingid,by_type,by_paydate,by_paynum,by_payer,by_geter) values ("+insertId+",'"+arr1[i]+"','"+arr2[i]+"','"+arr3[i]+"','"+arr4[i]+"','"+arr5[i]+"');";
			   		arrsql.push(sqli);
			   		debug(sqli);
			   	}
			   	async.eachSeries(arrsql, function (item, callback) {
				    debug(item);
				    mysql.query(item, function (err, res) {
				    	if(res.affectedRows == 1){
				        	callback(err, res);
				       	}else{
				       		callback('error', res);
				       	}
				    });
				}, function (err) {
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
	}else if(_sql == "getSupplyrecordById"){
		var id = req.param("id");
		var sql = "select * from supplyrecord where bookingid = " + id;
		debug(sql);
		mysql.query(sql, function(err, result) {
			if (err) return console.error(err.stack);
			res.json(result);
		});
	}else if(_sql == "getBuyrecordById"){
		var id = req.param("id");
		var sql = "select * from buyrecord where bookingid = " + id;
		debug(sql);
		mysql.query(sql, function(err, result) {
			if (err) return console.error(err.stack);
			res.json(result);
		});
	}else if(_sql == "getBooking"){
		var page = parseInt(req.param("indexPage"));
		var cid = parseInt(req.param("cid"));
		var role = req.param("role");
		var LIMIT = 6;
		page = (page && page > 0) ? page : 1;
		var limit = (limit && limit > 0) ? limit : LIMIT
		var sql1 = "select * from booking where userid = "+cid+" order by lastModify desc limit " + (page - 1) * limit + "," + limit;
		var sql2 = "select count(*) as count from booking where userid = "+cid;
		if(role == "管理员"){
			var sql1 = "select * from booking order by lastModify desc limit " + (page - 1) * limit + "," + limit;
			var sql2 = "select count(*) as count from booking";
		}
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
		res.write('window.parent.postMessage("supply@'+fname+'","*");');
		res.end('</script>');
	}else if(_sql == "uploadbuydo"){
		res.setHeader("Access-Control-Allow-Origin", "*");
		var fname = req.files.fileUpbuy.path.replace("public\\files\\", "").replace("public/files/", "");
		res.writeHead(200, {'Content-type' : 'text/html'});
		res.write('<script>');
		res.write('window.parent.postMessage("buy@'+fname+'","*");');
		res.end('</script>');
	}else if(_sql == "createUser"){
		var mode = req.param("mode");
		var username = req.param("username");
		var password = req.param("password");
		var name = req.param("name");
		var role = req.param("role");
		var editid = req.param("editid");
		/*编辑模式*/
		if(mode == "edit"){
			var sql = "update user set ";
			sql += " username = '"+username+"',";
			sql += " password = '"+password+"',";
			sql += " name = '"+name+"',";
			sql += " role = '"+role+"'";
			sql += " where id = "+editid;
			mysql.query(sql, function(err, result) {
				if (err) return console.error(err.stack);
				if(result.affectedRows == 1){
					res.send("300");
				}
			});
		}else{
			var sql = "insert into user (username,password,name,role) values ('"+username+"','"+password+"','"+name+"','"+role+"')";
			mysql.query(sql, function(err, result) {
				if (err) return console.error(err.stack);
				if(result.affectedRows == 1){
					res.send("300");
				}
			});
		}
	}else if(_sql == "getUser"){
		var page = parseInt(req.param("indexPage"));
		var LIMIT = 6;
		page = (page && page > 0) ? page : 1;
		var limit = (limit && limit > 0) ? limit : LIMIT
		var sql1 = "select * from user order by id desc limit " + (page - 1) * limit + "," + limit;
		var sql2 = "select count(*) as count from user";
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
	}else if(_sql == "getUserById"){
		var id = req.param("id");
		var sql = "select * from user where id = " + id;
		debug(sql);
		mysql.query(sql, function(err, result) {
			if (err) return console.error(err.stack);
			res.json(result);
		});
	}else if(_sql == "delUser"){
		var id = req.param("id");
		var sql = "delete from user where id = " + id;
		debug(sql);
		mysql.query(sql, function(err, result) {
			if (err) return console.error(err.stack);
			if(result.affectedRows == 1){
				res.send("300");
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