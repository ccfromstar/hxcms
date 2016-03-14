var R_content = React.createClass({
	getInitialState: function() { 
		var role = window.sessionStorage.getItem("crole");
		var isAdmin = (role=="管理员")?"":"none";
		return {data: [],total:0,totalpage: [],isFirst:"am-disabled",isLast:"am-disabled",isAdmin:isAdmin};
	},
	newDoc:function(){
		window.sessionStorage.setItem("mode","new");
		window.sessionStorage.removeItem("editid");
		window.sessionStorage.removeItem("startDate");
		window.location = 'booking.html';
	},
	readDoc:function(id){
		window.sessionStorage.setItem("readdocid",id);
		window.location = 'booking_read.html';
	},
	delDoc:function(id,e){
		var o = this;
		e.preventDefault();
		window.sessionStorage.setItem("delid",id);
		$("#del-confirm").modal();
	},
	editDoc:function(id,startDate,e){
		var o = this;
		e.preventDefault();
		window.sessionStorage.setItem("editid",id);
		window.sessionStorage.setItem("startDate",startDate);
		window.sessionStorage.setItem("mode","edit");
		window.location = 'booking.html';
	},
	delsql:function(){
		var o = this;
		$.ajax({
			type: "post",
			url: hosts + "/service/delBooking",
			data: {
				id:window.sessionStorage.getItem("delid")
			},
			success: function(data) {
				if(data == "300"){
					o.toPage(window.sessionStorage.getItem("indexPage"));
					$('.successinfo').html('<p>删除成功</p>').removeClass("none");
					setTimeout(function() {
						$('.successinfo').addClass("none");
					}, 2000);
				}
			}
		});
	},
	toPage:function(page,e){
		var o = this;
		if(e){
			e.preventDefault();
		}
		window.sessionStorage.setItem("indexPage",page);
		var indexPage = window.sessionStorage.getItem("indexPage");
		var id = window.sessionStorage.getItem('cid');
		var role = window.sessionStorage.getItem("crole");
		indexPage = indexPage?indexPage:1;
		$.ajax({
			type: "post",
			url: hosts + "/service/getBooking",
			data: {
				indexPage:indexPage,
				cid:id,
				role:role
			},
			success: function(data) {
				o.setState({data:data.record});
				o.setState({total:data.total});
				o.setState({totalpage:data.totalpage});
				o.setState({isFirst:(data.isFirstPage?"am-disabled":"")});
				o.setState({isLast:(data.isLastPage?"am-disabled":"")});
			}
		});
	},
	exportXls:function(){
		var id = window.sessionStorage.getItem('cid');
		var role = window.sessionStorage.getItem("crole");
		$.ajax({
			type: "post",
			url: hosts + "/service/exportBooking",
			data: {
				cid:id,
				role:role
			},
			success: function(data) {
				window.open(hosts + "/excelop/temp/"+data);
				$('.loadinfo').html("如果没有自动弹出，点击<a href='"+hosts + "/excelop/temp/"+data+"'>这里</a>下载报表(10秒后自动关闭)").removeClass("none");
				setTimeout(function() {
					$('.loadinfo').addClass("none");
				}, 10000);
			}
		});
	},
	componentDidMount:function(){
		var o = this;
		var indexPage = window.sessionStorage.getItem("indexPage");
		var id = window.sessionStorage.getItem('cid');
		indexPage = indexPage?indexPage:1;
		var role = window.sessionStorage.getItem("crole");
		if(role == "业务员"){
			$("#btn_add").removeClass("none");
		}
		$.ajax({
			type: "post",
			url: hosts + "/service/getBooking",
			data: {
				indexPage:indexPage,
				cid:id,
				role:role
			},
			success: function(data) {
				o.setState({data:data.record});
				o.setState({total:data.total});
				o.setState({totalpage:data.totalpage});
				o.setState({isFirst:(data.isFirstPage?"am-disabled":"")});
				o.setState({isLast:(data.isLastPage?"am-disabled":"")});
			}
		});
	},
	render:function(){
		var o = this;
		var list = this.state.data.map(function(c){
		return(
				<tr>
	              <td><a href="#" onClick={o.readDoc.bind(o,c.id)}>{c.bookingno}</a></td>
	              <td className={o.state.isAdmin}>{c.operator}</td>
	              <td className="am-hide-sm-only">{c.lastModify}</td>
	              <td>
	                <div className="am-btn-toolbar">
	                  <div className="am-btn-group am-btn-group-xs">
	                    <button onClick={o.editDoc.bind(o,c.id,c.startDate)} className="am-btn am-btn-default am-btn-xs am-text-secondary"><span className="am-icon-pencil-square-o"></span> 编辑</button>
	                    <button onClick={o.delDoc.bind(o,c.id)} className="am-btn am-btn-default am-btn-xs am-text-danger"><span className="am-icon-trash-o"></span> 删除</button>
	                  </div>
	                </div>
	              </td>
	            </tr>
			);
		});
		var pager=[];
		var iPa = Number(window.sessionStorage.getItem("indexPage"));
		iPa = iPa?iPa:1;
        for(var i=1;i<(this.state.totalpage)+1;i++){
        	var hasClass = "";
        	if(i == iPa){
        		hasClass = "am-active";
        	}
            pager.push(
                <li className={hasClass}><a href="#" onClick={o.toPage.bind(o,i)}>{i}</a></li>
            )
        }
		return(
			<div className="admin-content">
			
			    <div className="am-cf am-padding">
			      <div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">销售订单</strong> / <small>列表</small></div>
				</div>
			    <div className="am-g">
			      <div className="am-u-sm-12 am-u-md-12">
			        <div className="am-btn-toolbar">
			          <div className="am-btn-group am-btn-group-xs">
			            <button id="btn_add" type="button" onClick={this.newDoc} className="am-btn am-btn-default none"><span className="am-icon-plus"></span> 新增</button>
			          	<button type="button" onClick={this.exportXls} className="am-btn am-btn-default"><span className="am-icon-file-excel-o"></span> 导出Excel</button>
			          </div>
			        </div>
			      </div>
			    </div>
			    
			    <div className="am-g">
				    <div className="am-u-sm-12">
				        <form className="am-form">
				          <table className="am-table am-table-striped am-table-hover table-main">
				            <thead>
				              <tr>
				                <th>订单号</th>
				                <th className={this.state.isAdmin}>操作人</th>
			            		<th className="am-hide-sm-only">修改日期</th>
			            		<th className="table-set">操作</th>
				              </tr>
				          	</thead>
				          	<tbody>
				          		{list}
				          	</tbody>
				          </table>
				          	<div className="am-cf">
							  共 {this.state.total} 条记录
							  <div className="am-fr">
							    <ul className="am-pagination">
							      <li className={this.state.isFirst}><a href="#" onClick={this.toPage.bind(this,Number(window.sessionStorage.getItem("indexPage"))-1)}>«</a></li>
							      {pager}
							      <li className={this.state.isLast}><a href="#" onClick={this.toPage.bind(this,Number(window.sessionStorage.getItem("indexPage"))+1)}>»</a></li>
							    </ul>
							  </div>
							</div>
				        </form>
				    </div>
				</div>
				<div className="am-modal am-modal-confirm" tabIndex="-1" id="del-confirm">
				  <div className="am-modal-dialog">
				    <div className="am-modal-hd">提示</div>
				    <div className="am-modal-bd">
				      你，确定要删除这条记录吗？
				    </div>
				    <div className="am-modal-footer">
				      <span className="am-modal-btn" data-am-modal-cancel>取消</span>
				      <span className="am-modal-btn" data-am-modal-confirm onClick={this.delsql}>确定</span>
				    </div>
				  </div>
				</div>
			</div>
		);
	}
});