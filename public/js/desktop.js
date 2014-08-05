$(function() {
	var init = function() {
		$.get('/api/project', function(data, status) {
			if (status == "success") {
				$.each(data, function(i, project) {
					var isOwner = (project.role == "owner") ? "是" : "否";
					var isManager = ((project.role == "admin") || project.role == "owner") ? "是" : "否";
					var toEditOrQuit = (isManager == "是") ? "编辑" : "退出项目";
					var editOrQuitUrl = (isManager == "是") ? "/project/" + project.id : "#";
					var pInfo = "/desktop/projectInfo/"+project.name+'/'+project.id;
					var $projectTemplate = $("<tr><th><a href="+pInfo+">" + project.name + "</a></th><th>2014.7.29</th><th>" + isOwner + "</th><th>" + isManager + "</th><th>[<a id='quitProject' data-id=" + project.id + " href=" + editOrQuitUrl + ">" + toEditOrQuit + "</a>]</th></tr></tbody>");
					$("#projectLists").append($projectTemplate);
					if (isManager == "否") {
						var $target = $projectTemplate.find("#quitProject");
						$target.click(function(e) {
							e.preventDefault();
							quitProject(this);
						});
					}
				});
			}
		});
	}();

	function quitProject(that) {
		var id = $(that).attr("data-id");
		if (confirm("确定要退出项目吗？")) {
			$.ajax({
				url: '/api/project/'+id,
				type: 'put',
				success: function(data, status) {
					if (data == "success") {
						$(that).parent().parent().remove();
					}
				},
				error: function(xhr, message) {
					console.info("更新项目数据失败:" + message);
				}
			});
		}
	}
});