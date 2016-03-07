var numDay_val = ""; /*保存上次的值*/
var numPerson_val = ""; /*保存上次的值*/
var R_content = React.createClass({
	 getInitialState:function(){
        return {numDay:""};
    },
	createDoc:function(){
		var bookingno = $('#bookingno').val();
		var saler = $('#saler').val();
		var operator = $('#operator').val();
		var startDate = $('#startDate').val();
		var ShipName = $('#ShipName').val();
		var numDay = $('#numDay').val();
		var txtLine = $('#txtLine').val();
		var txtRoom = $('#txtRoom').val();
		var numPerson = $('#numPerson').val();
		var remark = $('#remark').val();
		
		if (!bookingno) {
			$('.errorinfo').html('<p>订单编号不能为空</p>').removeClass("none");
			setTimeout(function() {
				$('.errorinfo').addClass("none");
			}, 2000);
			return false;
		}
		if (!saler) {
			$('.errorinfo').html('<p>销售人不能为空</p>').removeClass("none");
			setTimeout(function() {
				$('.errorinfo').addClass("none");
			}, 2000);
			return false;
		}
		if (!startDate) {
			$('.errorinfo').html('<p>出发日期不能为空</p>').removeClass("none");
			setTimeout(function() {
				$('.errorinfo').addClass("none");
			}, 2000);
			return false;
		}
		if (!ShipName) {
			$('.errorinfo').html('<p>邮轮名称不能为空</p>').removeClass("none");
			setTimeout(function() {
				$('.errorinfo').addClass("none");
			}, 2000);
			return false;
		}
		if (!numDay) {
			$('.errorinfo').html('<p>天数不能为空</p>').removeClass("none");
			setTimeout(function() {
				$('.errorinfo').addClass("none");
			}, 2000);
			return false;
		}
		if (!txtLine) {
			$('.errorinfo').html('<p>航线不能为空</p>').removeClass("none");
			setTimeout(function() {
				$('.errorinfo').addClass("none");
			}, 2000);
			return false;
		}
		if (!txtRoom) {
			$('.errorinfo').html('<p>房型数量不能为空</p>').removeClass("none");
			setTimeout(function() {
				$('.errorinfo').addClass("none");
			}, 2000);
			return false;
		}
		if (!numPerson) {
			$('.errorinfo').html('<p>总人数不能为空</p>').removeClass("none");
			setTimeout(function() {
				$('.errorinfo').addClass("none");
			}, 2000);
			return false;
		}
		$.ajax({
			type: "post",
			url: hosts + "/service/createBooking",
			data: {
				bookingno: bookingno,
				saler: saler,
				operator:operator,
				startDate:startDate,
				ShipName:ShipName,
				numDay:numDay,
				txtLine:txtLine,
				txtRoom:txtRoom,
				numPerson:numPerson,
				remark:remark,
				userid: window.sessionStorage.getItem('cid')
			},
			success: function(data) {
				if(data == "300"){
					$('.successinfo').html('<p>保存成功</p>').removeClass("none");
					setTimeout(function() {
						window.location = 'index.html';
					}, 1000);
				}
			}
		});
	},
	cancleDoc:function(){
		window.location = 'index.html';
	},
	numDay:function(e){
        var val = e.target.value;
        if(isNaN(val)){
            val = numDay_val;
            $('.errorinfo').html('<p>只能填写数字</p>').removeClass("none");
			setTimeout(function() {
				$('.errorinfo').addClass("none");
			}, 2000);
        }else{
            numDay_val = val; 
        }
        this.setState({"numDay":val});
    },
    numPerson:function(e){
        var val = e.target.value;
        if(isNaN(val)){
            val = numPerson_val;
            $('.errorinfo').html('<p>只能填写数字</p>').removeClass("none");
			setTimeout(function() {
				$('.errorinfo').addClass("none");
			}, 2000);
        }else{
            numPerson_val = val; 
        }
        this.setState({"numPerson":val});
    },
	showCal:function(){
		$('#startDate').datepicker('open');
	},
	componentDidMount:function(){
		$('#operator').val(window.sessionStorage.getItem('cname'));
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
				            <div className="am-u-sm-8 am-u-md-4">
				              <input type="text" id="bookingno" className="am-input-sm" />
				            </div>
				            <div className="am-hide-sm-only am-u-md-6">*必填，不可重复，格式：YLDJ-160105QJ1</div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              销售人
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              <input type="text" id="saler" className="am-input-sm" />
				            </div>
				            <div className="am-hide-sm-only am-u-md-6">*必填</div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              操作人
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              <input type="text" id="operator" className="am-input-sm" readOnly />
				            </div>
				            <div className="am-hide-sm-only am-u-md-6"></div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              出发日期
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              	<div className="am-input-group am-datepicker-date">
								  <input type="text" id="startDate" className="am-form-field" readOnly />
								  <span className="am-input-group-btn am-datepicker-add-on">
								    <button onClick={this.showCal} className="am-btn am-btn-default" type="button"><span className="am-icon-calendar"></span> </button>
								  </span>
								</div>
				            </div>
				            <div className="am-hide-sm-only am-u-md-6">*必填</div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              邮轮名称
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              <input type="text" id="ShipName" className="am-input-sm" />
				            </div>
				            <div className="am-hide-sm-only am-u-md-6">*必填</div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              天数
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              <input type="text" id="numDay" className="am-input-sm" />
				            </div>
				            <div className="am-hide-sm-only am-u-md-6">*必填</div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              航线
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              <input type="text" id="txtLine" className="am-input-sm" />
				            </div>
				            <div className="am-hide-sm-only am-u-md-6">*必填</div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              房型数量
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              <input type="text" id="txtRoom" className="am-input-sm" />
				            </div>
				            <div className="am-hide-sm-only am-u-md-6">*必填</div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              总人数
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              <input type="text" id="numPerson" className="am-input-sm" value={this.state.numPerson} onChange={this.numPerson} />
				            </div>
				            <div className="am-hide-sm-only am-u-md-6">*必填</div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-2 am-text-right">
				              订单说明
				            </div>
				            <div className="am-u-sm-8 am-u-md-10">
				            	<textarea id="remark" rows="3"></textarea>
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
				    <button type="button" onClick={this.createDoc} className="btn-c am-btn am-btn-primary am-btn-xs">提交保存</button>
				    <button type="button" onClick={this.cancleDoc} className="btn-c am-btn am-btn-primary am-btn-xs">放弃保存</button>
				</div>
			</div>
		);
	}
});