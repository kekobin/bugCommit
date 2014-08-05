$(function() {
	var id = $("#projectId").val(); //作为判断是创建还是编辑的依据
	$("#addStaff").click(function() {
		var $staffBlock = $(".add_staff");
		var staffName = $staffBlock.find("input").val();
		var selectValue = $staffBlock.find("select option:selected").text();

		var $template = $("<li><span class=s_name>" + staffName + "</span><span class=s_role>" + selectValue + "</span><span></span><img src='/img/delete.png'/></li>");
		$("#staffList").append($template);
		$template.find('img').click(function() {
			$(this).parent().remove();
		});
	});

	$("#createProject").click(function() {
		var name = $("#pName").val();
		var $li = $("#staffList li");
		var arr = [];

		arr.push({
			name: $("#user").html(),
			role: "owner"
		});

		for (var i = 1, length = $li.length; i < length; i += 1) {
			var item = $li[i];
			arr.push({
				name: $(item).find(".s_name").html(),
				role: $(item).find(".s_role").html()
			});
		}

		var tdata = {
			name: name,
			staffs: arr
		};

		var url = "/api/project";
		var type = (id == "null") ? "POST" : "PUT";
		$.ajax({
			url: url,
			data: tdata,
			type: type,
			success: function(status, data) {
				location.href = 'http://' + location.host + '/desktop';
			},
			error: function(xhr, message) {
				console.info("创建失败:" + message);
			}
		});
	});

	$("#cpBack").click(function() {
		location.href = 'http://' + location.host + '/desktop';
	});


	//edit condition
	if (id != "null") {
		init();
	} else {
		$("#createProject").html("创建");
		$("#pName").removeAttr("readonly");
	}

	function init() {
		$.get('/api/project/' + id, function(data, status) {
			if (status == "success") {
				$("#pName").val(data.name).attr("readonly","readonly");
				var tStaffs = data.staffs;
				for (var i = 1, len = tStaffs.length; i < len; i += 1) {
					var item = tStaffs[i];
					var $template = $("<li><span class=s_name>" + item.name + "</span><span class=s_role>" + item.role + "</span><span></span><img src='/img/delete.png'/></li>");
					$("#staffList").append($template);
					$template.find('img').click(function() {
						$(this).parent().remove();
					});
				}

				$("#createProject").html("修改");
			}
		});
	}
});