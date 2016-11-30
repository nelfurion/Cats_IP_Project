var CatsService = (function($) {
	var catsUrl = "http://localhost:8080/rst2/api/cats",
		breedsUrl = "http://localhost:8080/rst2/api/cats/breeds",
		dataType = 'json';

	var catsService = function() {};

	catsService.prototype.get = function(
			page = 0,
			perPage = 5,
			breed = '',
			region = '',
			ferocity = 0,
			cuteness = '') {
		return new Promise(function(resolve, reject) {
			$.get({
				url: catsUrl + '?page=' + page +
					'&perPage=' + perPage +
					'&breed=' + breed +
					'&region=' + region +
					'&ferocityLevel=' +ferocity +
					'&cutenessFactor=' + cuteness,
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
			  url: catsUrl,
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

	catsService.prototype.getBreeds = function () {
		return new Promise(function (resolve, reject) {
			$.ajax({
				url: breedsUrl,
				dataType: "json",
  			  	contentType: "application/json"
			})
			.success(function(breeds) {
				resolve(breeds);
			});
		});
	}

	catsService.prototype.getRegions = function () {
		return new Promise(function (resolve, reject) {
			$.ajax({
				url: catsUrl + '/regions',
				dataType: "json",
  			  	contentType: "application/json"
			})
			.success(function(getRegions) {
				resolve(getRegions);
			});
		});
	}

	catsService.prototype.getCutenessFactors = function () {
		return new Promise(function (resolve, reject) {
			$.ajax({
				url: catsUrl + '/cutenessFactors',
				dataType: "json",
  			  	contentType: "application/json"
			})
			.success(function(getCutenessFactors) {
				resolve(getCutenessFactors);
			});
		});
	}

	catsService.prototype.getFerocityLevels = function () {
		return new Promise(function (resolve, reject) {
			$.ajax({
				url: catsUrl + '/ferocityLevels',
				dataType: "json",
  			  	contentType: "application/json"
			})
			.success(function(getFerocityLevels) {
				resolve(getFerocityLevels);
			});
		});
	}

	return catsService;
})(jQuery);
