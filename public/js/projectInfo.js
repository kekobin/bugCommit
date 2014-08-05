$(function() {
	$.get('/api/bug', function(data, status) {
		if(status == "success") {
			$.each(data, function(i, bug) {
				var level;
				var editUrl = "/project/bug/"+bug._id+'/'+$("#pName").html()+'/'+$("#pid").val();
				switch(bug.level) {
					case "1": level = "低";break;
					case "2": level = "中";break;
					case "3": level = "高";break;
					case "4": level = "紧急";break;
					case "5": level = "严重";break;
					default: level = "低";
				};
				var $template = $("<tr><td><a href="+editUrl+">"+bug.title+"</a></td><td>"+level+"</td><td>"+bug.fixed+"</td><td>"+bug.dealer+"</td></tr>");
				$("#bugInfo").append($template);
			});
		}
	});
});