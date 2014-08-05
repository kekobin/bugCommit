$(function() {
	var id = $("#bugId").val();
	if (id != "null") {
		init();
	} else {
		//初始化处理人
		initDealer();
		$(".read_show").hide();
		$(".c_show").show();
		$("#createBug").html("提交");
		$("#bugName").removeAttr("readonly");
	}

	$("#createBug").click(function(e) {
		var model = buildModel();
		var url = (id == 'null') ? '/api/bug' : '/api/bug/'+id;
		var type = (id == 'null') ? "POST" : "PUT";
		
		if(id != 'null') {
			model = {
				time: model.time,
				dealer: model.dealer,
				fixed: model.fixed,
				description: model.description
			};
		} 

		$.ajax({
			url: url,
			type: type,
			data: model,
			success: function(data, status) {
				location.href = 'http://' + location.host + '/desktop/projectInfo/' + $("#pName").html()+'/'+$("#pid").val();
			},
			error: function(xhr, message) {
				console.info("创建bug失败:" + message);
			}
		});
	});

	$("#cpBack").click(function() {
		window.history.back();
	});	

	$("#level input[type=radio]").click(function() {
		$(this).siblings().removeClass("checked");
		$(this).addClass("checked");
	});

	function init() {
		$(".read_show").show();
		$(".c_show").hide();
		$.get("/api/bug/" + id, function(data, status) {
			var level, status = data.fixed;
			$("#bugName").val(data.title);
			$("#time").html(data.time);
			initDealer(data.dealer);
			switch(data.level) {
				case "1": level = "低";break;
				case "2": level = "中";break;
				case "3": level = "高";break;
				case "4": level = "紧急";break;
				case "5": level = "严重";break;
				default: level = "低";
			};

			$("#level .read_show").html(level);
			
			if(status == "已修复") {
				$("#status .fixed").attr("selected", "selected");
			} else {
				$("#status .nofixed").attr("selected", "selected");
			}
			$("#description").val(data.description);
			$("#createBug").html("修改");
			$("#bugName").attr("readonly","readonly");
		});
	}

	function initDealer(dealer) {
		$.get('/users', function(data, status) {
			if (status == "success") {
				$.each(data, function(i, user) {
					var selected = ((dealer!=null)&&dealer==user.email) ? 'selected' : '';
					var $template = $("<option>" + user.email + "</option>");
					$("#dealer").append($template);
					if(selected != '') {
						$template.attr("selected", selected);
					}
				});
			}
		});
	}

	function buildModel() {
		var date = new Date();
		var time = date.getFullYear() + '.' + parseInt(date.getMonth() + 1) + '.' + date.getDate() + ' ' + parseInt(date.getHours()) + ':' + parseInt(date.getMinutes() + 1) + ':' + parseInt(date.getSeconds() + 1);
		var status = $("#status>option:checked").html();
		var model = {
			pname: $("#pName").html(),
			title: $("#bugName").val(),
			time: time,
			dealer: $("#dealer").find("option:selected").val(),
			level: $("#level input[type=radio].checked").val(),
			fixed: status,
			description: $("#description").val()
		};
		console.info(model)
		return model;
	};
});