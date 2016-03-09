var supply_total_val = ""; /*保存上次的值*/
var numPerson_val = ""; /*保存上次的值*/
var R_supplylist = React.createClass({
	getInitialState:function(){
		window.sessionStorage.setItem('numSupply',1);
        return {numSupply:1};
    },
    addsp:function(){
    	var n = Number(this.state.numSupply)+1;
    	window.sessionStorage.setItem('numSupply',n);
    	this.setState({numSupply:n});
    },
    plussp:function(){
    	var n = Number(this.state.numSupply)-1;
    	if(n == 0){
    		$('.errorinfo').html('<p>只剩一条记录不能删除</p>').removeClass("none");
			setTimeout(function() {
				$('.errorinfo').addClass("none");
			}, 2000);
			return false;
    	}
    	window.sessionStorage.setItem('numSupply',n);
    	this.setState({numSupply:n});
    },
    componentDidMount:function(){
		var o = this;
		$('#operator').val(window.sessionStorage.getItem('cname'));
		var mode = window.sessionStorage.getItem('mode');
		if(mode == "edit"){
			var editid = window.sessionStorage.getItem("editid");
			$.ajax({
				type: "post",
				url: hosts + "/service/getSupplyrecordById",
				data: {
					id:editid
				},
				success: function(data) {
					var num = 0;
					for(var i in data){
						num += 1;
					}
					window.sessionStorage.setItem('numSupply',num);
    				o.setState({numSupply:num});
    				for(var i in data){
						$('#sp_type_'+i).val(data[i].sp_type);
						$('#sp_paydate_'+i).val(data[i].sp_paydate);
						$('#sp_paynum_'+i).val(data[i].sp_paynum);
						$('#sp_payer_'+i).val(data[i].sp_payer);
						$('#sp_geter_'+i).val(data[i].sp_geter);
					}
				}
			});
		}
		$('#supplyformFile').attr('action',hosts + "/service/uploaddo");
	},
	render:function(){
		var list=[];
        for(var i=0;i<this.state.numSupply;i++){
            list.push(
               <tr>
	              <td><input type="text" id={"sp_type_"+i} className="am-input-sm" /></td>
	              <td><input type="text" id={"sp_paydate_"+i} className="am-input-sm" /></td>
	              <td><input type="text" id={"sp_paynum_"+i} className="am-input-sm" /></td>
	              <td><input type="text" id={"sp_payer_"+i} className="am-input-sm" /></td>
	              <td><input type="text" id={"sp_geter_"+i} className="am-input-sm" /></td>
	            </tr>
            )
        }
		return(
			<div>
				<table className="am-table am-table-striped am-table-hover table-main">
					<thead>
					   	<tr>
					        <th>款项类型</th>
				            <th>付款日期</th>
				            <th>付款金额</th>
				            <th>付款人(华夏/老大)</th>
				            <th>收款方</th>
					    </tr>
					</thead>
					<tbody>
					    {list}
					</tbody>
				</table>
				<button type="button" onClick={this.addsp} className="btn-c am-btn am-btn-primary am-btn-xs">增加</button>
				<button type="button" onClick={this.plussp} className="btn-c am-btn am-btn-primary am-btn-xs">删除</button>
			</div>
		);
	}
});
var R_content = React.createClass({
	getInitialState:function(){
		var mode = window.sessionStorage.getItem('mode');
		var smallname = (mode == "edit")?"编辑":"新建";
		var role = window.sessionStorage.getItem('crole');
		var finish = '';
		if(role == "业务员"){
			finish = 'none';
		}
        return {finish:finish,numDay:"",startDate:window.sessionStorage.getItem('startDate'),supply_total:"",smallname:smallname};
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
		
		var supplyfile = $('#supplyfile').val();
		var supply_company = $('#supply_company').val();
		var supply_name = $('#supply_name').val();
		var supply_tel = $('#supply_tel').val();
		var supply_total = $('#supply_total').val();
		var supply_deadline = $('#supply_deadline').val();
		
		var sp_type = null;
		var sp_paydate = null;
		var sp_paynum = null;
		var sp_payer = null;
		var sp_geter = null;
		var n = window.sessionStorage.getItem('numSupply');
		for(var i=0;i<n;i++){
			if(!sp_type){
				sp_type = $("#sp_type_"+i).val();
				sp_paydate = $("#sp_paydate_"+i).val();
				sp_paynum = $("#sp_paynum_"+i).val();
				sp_payer = $("#sp_payer_"+i).val();
				sp_geter = $("#sp_geter_"+i).val();
			}else{
				sp_type = sp_type + "@" + $("#sp_type_"+i).val();
				sp_paydate = sp_paydate + "@" + $("#sp_paydate_"+i).val();
				sp_paynum = sp_paynum + "@" + $("#sp_paynum_"+i).val();
				sp_payer = sp_payer + "@" + $("#sp_payer_"+i).val();
				sp_geter = sp_geter + "@" + $("#sp_geter_"+i).val();
			}
		}
		
		var mode = window.sessionStorage.getItem('mode');
		
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
				mode:mode,
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
				supplyfile:supplyfile,
				supply_company:supply_company,
				supply_name:supply_name,
				supply_tel:supply_tel,
				supply_total:supply_total,
				supply_deadline:supply_deadline,
				sp_type:sp_type,
				sp_paydate:sp_paydate,
				sp_paynum:sp_paynum,
				sp_payer:sp_payer,
				sp_geter:sp_geter,
				numSupply:n,
				userid: window.sessionStorage.getItem('cid')
			},
			success: function(data) {
				console.log(data);
				if(data == "300"){
					$('.successinfo').html('<p>保存成功</p>').removeClass("none");
					setTimeout(function() {
						window.location = 'index.html';
					}, 1000);
				}else if(data == "400"){
					$('.errorinfo').html('<p>订单编号重复</p>').removeClass("none");
					setTimeout(function() {
						$('.errorinfo').addClass("none");
					}, 2000);
				}
			}
		});
	},
	cancleDoc:function(){
		window.location = 'index.html';
	},
	supply_total:function(e){
        var val = e.target.value;
        if(isNaN(val)){
            val = supply_total_val;
            $('.errorinfo').html('<p>只能填写数字</p>').removeClass("none");
			setTimeout(function() {
				$('.errorinfo').addClass("none");
			}, 2000);
        }else{
            supply_total_val = val; 
        }
        this.setState({"supply_total":val});
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
	UploadSupplyer:function(){
		var path = document.all.fileUp.value;
		if(!path){return false;}
		$('.loadinfo').html('<p>文件上传中...</p>').removeClass("none");
        $('#supplyformFile').submit();
	},
	componentDidMount:function(){
		var o = this;
		$('#operator').val(window.sessionStorage.getItem('cname'));
		var mode = window.sessionStorage.getItem('mode');
		if(mode == "edit"){
			var editid = window.sessionStorage.getItem("editid");
			$.ajax({
				type: "post",
				url: hosts + "/service/getBookingById",
				data: {
					id:editid
				},
				success: function(data) {
					$('#bookingno').val(data[0].bookingno).attr("readonly","readonly");
					$('#saler').val(data[0].saler);
					$('#operator').val(data[0].operator);
					//$('#startDate').val(data[0].startDate);
					$('#ShipName').val(data[0].ShipName);
					$('#numDay').val(data[0].numDay);
					$('#txtLine').val(data[0].txtLine);
					$('#txtRoom').val(data[0].txtRoom);
					$('#numPerson').val(data[0].numPerson);
					$('#remark').html(data[0].remark);
					
					$('#supply_company').val(data[0].supply_company);
					$('#supply_name').val(data[0].supply_name);
					$('#supply_tel').val(data[0].supply_tel);
					$('#supply_total').val(data[0].supply_total);
					$('#supply_deadline').val(data[0].supply_deadline);
					$('#supplyfile').val(data[0].supplyfile);
					if(data[0].supplyfile){
						var files = '<span class="am-icon-file-o"></span> <a target="_blank" href="'+hosts+'/files/'+data[0].supplyfile+'">供应商确认单</a>';
						$('#supplyfile_div').html(files);
					}
					
				}
			});
		}
		$('#supplyformFile').attr('action',hosts + "/service/uploaddo");
	},
	render:function(){
		return(
			<div className="admin-content">
			
			   	<div className="am-cf am-padding">
					<div className="am-fl am-cf"><strong className="am-text-primary am-text-lg">销售订单</strong> / <small>{this.state.smallname}</small></div>
				</div>
			    
			    <div className="am-tabs am-margin" data-am-tabs>
				    <ul className="am-tabs-nav am-nav am-nav-tabs">
				      <li className="am-active"><a href="#tab1">销售填写</a></li>
				      <li><a href="#tab2">下家信息</a></li>
				      <li><a href="#tab3">上家信息</a></li>
				      <li><a href="#tab4" className={this.state.finish}>结团信息</a></li>
				      <li><a href="#tab5">说明</a></li>
				    </ul>
				
				    <div className="am-tabs-bd">
				      <div className="am-tab-panel am-fade am-in am-active" id="tab1">
				       	<div className="am-form">
				       	
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
								  <input type="text" id="startDate" className="am-form-field" defaultValue={this.state.startDate} readOnly />
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
				        </div>
				      </div>
				      <div className="am-tab-panel am-fade" id="tab2">
				       	2
				      </div>
				      <div className="am-tab-panel am-fade" id="tab3">
				       	<div className="am-form">
				       	
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-3 am-text-right">
				              供应商公司
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              <input type="text" id="supply_company" className="am-input-sm" />
				            </div>
				            <div className="am-hide-sm-only am-u-md-5"></div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-3 am-text-right">
				              联系姓名
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              <input type="text" id="supply_name" className="am-input-sm" />
				            </div>
				            <div className="am-hide-sm-only am-u-md-5"></div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-3 am-text-right">
				              联系电话
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              <input type="text" id="supply_tel" className="am-input-sm" />
				            </div>
				            <div className="am-hide-sm-only am-u-md-5"></div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-3 am-text-right">
				              采购金额
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              <input type="text" id="supply_total" className="am-input-sm" value={this.state.supply_total} onChange={this.supply_total} />
				            </div>
				            <div className="am-hide-sm-only am-u-md-5"></div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-3 am-text-right">
				              付款时限
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              <input type="text" id="supply_deadline" className="am-input-sm" />
				            </div>
				            <div className="am-hide-sm-only am-u-md-5"></div>
				          </div>
				          
				          <div className="am-g am-margin-top">
				            <div className="am-u-sm-4 am-u-md-3 am-text-right">
				              供应商确认单上传
				            </div>
				            <div className="am-u-sm-8 am-u-md-4">
				              	<form id="supplyformFile" name="formFile" method="post" target="frameFile"
    encType="multipart/form-data">
				              		<div className="am-form-file">
									  <button type="button" className="am-btn am-btn-default am-btn-sm">
									    <i className="am-icon-cloud-upload"></i> 选择要上传的文件
									  </button>
									  <input type="file" id="fileUp" onChange={this.UploadSupplyer} name="fileUp" />
									</div>                                    
									<div id="supplyfile_div"></div>
				              	</form>
				              	<iframe id="frameFile" name="frameFile" style={{display: 'none'}}></iframe>
				              	<input type="hidden" id="supplyfile" />
				            </div>
				            <div className="am-hide-sm-only am-u-md-5"></div>
				          </div>
				          
				          <R_supplylist />
				          
				        </div>
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
				    <button type="button" onClick={this.createDoc} className="btn-c am-btn am-btn-primary am-btn-xs">保存</button>
				    <button type="button" onClick={this.cancleDoc} className="btn-c am-btn am-btn-primary am-btn-xs">关闭</button>
				</div>
			</div>
		);
	}
});