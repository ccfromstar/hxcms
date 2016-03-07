var R_content = React.createClass({
	getInitialState: function() { 
		return {bookingno: "",saler:"",operator:"",startDate:"",ShipName:"",numDay:"",txtLine:"",txtRoom:"",numPerson:"",remark:""};
	},
	cancleDoc:function(){
		window.location = 'index.html';
	},
	componentDidMount:function(){
		var o = this;
		var readdocid = window.sessionStorage.getItem("readdocid");
		$.ajax({
			type: "post",
			url: hosts + "/service/getBookingById",
			data: {
				id:readdocid
			},
			success: function(data) {
				o.setState({bookingno:data[0].bookingno});
				o.setState({saler:data[0].saler});
				o.setState({operator:data[0].operator});
				o.setState({startDate:data[0].startDate});
				o.setState({ShipName:data[0].ShipName});
				o.setState({numDay:data[0].numDay});
				o.setState({txtLine:data[0].txtLine});
				o.setState({txtRoom:data[0].txtRoom});
				o.setState({numPerson:data[0].numPerson});
				$('#remark').html(data[0].remark);
			}
		});
	},
	render:function(){
		return(
			<div className="admin-content">
			
			   	<div className="am-cf am-padding">
					<div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">销售订单</strong> / <small>表单</small></div>
				</div>
			    
			    <div className="am-tabs am-margin" data-am-tabs>
				    <ul className="am-tabs-nav am-nav am-nav-tabs">
				      <li className="am-active"><a href="#tab1">销售填写</a></li>
				      <li><a href="#tab2">下家信息</a></li>
				      <li><a href="#tab3">上家信息</a></li>
				      <li><a href="#tab4">结团信息</a></li>
				      <li><a href="#tab5">说明</a></li>
				    </ul>
				
				    <div className="am-tabs-bd">
				      <div className="am-tab-panel am-fade am-in am-active" id="tab1">
				       	<form className="am-form">
				       	
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              订单编号
				            </div>
				            <div className="am-u-sm-8 am-u-md-10">
				              {this.state.bookingno}
				            </div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              销售人
				            </div>
				            <div className="am-u-sm-8 am-u-md-10">
				              {this.state.saler}
				            </div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              操作人
				            </div>
				            <div className="am-u-sm-8 am-u-md-10">
				              {this.state.operator}
				            </div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              出发日期
				            </div>
				            <div className="am-u-sm-8 am-u-md-10">
				              	{this.state.startDate}
				            </div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              邮轮名称
				            </div>
				            <div className="am-u-sm-8 am-u-md-10">
				              	{this.state.ShipName}
				            </div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              天数
				            </div>
				            <div className="am-u-sm-8 am-u-md-10">
				              {this.state.numDay}
				            </div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              航线
				            </div>
				            <div className="am-u-sm-8 am-u-md-10">
				            	{this.state.txtLine}
				            </div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              房型数量
				            </div>
				            <div className="am-u-sm-8 am-u-md-10">
				            	{this.state.txtRoom}
				            </div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              总人数
				            </div>
				            <div className="am-u-sm-8 am-u-md-10">
				            	{this.state.numPerson}
				            </div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              订单说明
				            </div>
				            <div id="remark" className="am-u-sm-8 am-u-md-10">
				            	
				            </div>
				          </div>
				          
				        </form>
				      </div>
				      <div className="am-tab-panel am-fade" id="tab2">
				       	2
				      </div>
				      <div className="am-tab-panel am-fade" id="tab3">
				       	3
				      </div>
				      <div className="am-tab-panel am-fade" id="tab4">
				       	4
				      </div>
				      <div className="am-tab-panel am-fade" id="tab5">
				       	<div className="am-panel am-panel-default admin-sidebar-panel">
					        <div className="am-panel-bd">
					          <p><span className="am-icon-bookmark"></span> 说明</p>
					          <p>1、销售在提交《付款申请单》时候，填写本单（打星号部分为必填），并附上与下家的订单确认单（需有下家确认盖章或签字）。交由财务确认留底。</p>
					          <p>2、如收付为其他，需其他方负责人在本单上签字方有效。如在订单未结团前，出现金额更改，订单变动，退款等情况，销售需到财务处，在本单上一并修改。</p>
					          <p>3、在订单出行后，需办理结团。按照以下规则完成结团：除需退款订单之外，如订单结束日为当月20日之前，则当月结团。如订单结束日为当月20日之后，则次月结团。如无法按时完成结团的。将统一汇报给领导处理。</p>
					          <p>4、财务填写结团信息，销售需配合完成应结团订单相关操作，包括帐款，上家需要提供的发票等均需收齐。完后后财务和销售共同签字。</p>
					          <p>5、订单在完成结团后方可给予销售提成。提成月份为结团次月。</p>
					        </div>
					    </div>
				      </div>
				    </div>
				</div>
				
				<div className="am-margin">
				    <button type="button" onClick={this.cancleDoc} className="btn-c am-btn am-btn-primary am-btn-xs">关闭</button>
				</div>
			</div>
		);
	}
});