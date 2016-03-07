$(function() {
	var id = window.sessionStorage.getItem('cid');
	if(!id){
		window.location = 'login.html';
	}
});