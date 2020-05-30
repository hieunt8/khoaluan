src="http://code.jquery.com/jquery-2.1.4.min.js"
src="/socket.io/socket.io.js"

$(document).ready(function(){
	var socket = io.connect("http://10.45.29.247:5000/uit/chatreal");
	
	socket.emit("new user", "khoapham.vn");
	
	socket.emit("new user", $username.val(), function(data){
		if(data){
			
		}else{
			
		}	
	});	

	socket.on("server-gui-ve", function(data){
		//io.sockets.emit("new message",{msg:data});
		alert(data);
	})
	
	socket.on("disconnect", function(data){
		if(!socket.username) return;
		else
		usernames.splice(usernames.indexOf(socket.username), 1);	
	});
	
});