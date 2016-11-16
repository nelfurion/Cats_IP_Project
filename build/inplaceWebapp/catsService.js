var CatsService = (function($) {
	var url = "http://localhost:8080/rst2/api/cats";
	var dataType = 'json';
	
	var catsService = function() {};
	
	catsService.prototype.get = function() {
		return new Promise(function(resolve, reject) {
			$.get({
				url: url,
				dataType: dataType,
				success: function(cats){
					resolve(cats);
				}
			});
		});
	};
	
	catsService.prototype.add = function(cat) {
		return new Promise(function(resolve, reject) {
			$.ajax({
			  url: url,
			  method: "POST",
			  data: JSON.stringify(cat),
			  dataType: "json",
			  contentType: "application/json"
			})
			.success(function(cat) {
				resolve(cat);
			});
		});
	};
	
	return catsService;
})(jQuery);