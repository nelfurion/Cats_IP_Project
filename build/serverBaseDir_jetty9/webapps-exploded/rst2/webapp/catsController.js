var CatsController = (function (catsService) {
    var catsTable = $('#catsTable'),
	tr = $('<tr>'),
	td = $('<td>'),
	pageList = $('#pagination'),
	pageDom = $('<li><a href="#"></a></li>'),
    headers = $('<tr><th>Id</th><th>Breed</th><th>Ferocity</th><th>Cuteness</th><th>Region</th></tr>')

    var catsController = function () {};

    function addHeaders() {
        catsTable.append(headers);
    }

	catsController.prototype.getBreeds = function() {
		catsService.getBreeds()
			.then(function (breeds) {
				console.log(breeds);
			});
	};

	cleanLastPage = function() {
		catsTable.html('');
		pageList.html('');
	};

	catsController.prototype.getPageData = function(page, perPage, breed, region, ferocity, cuteness) {
		cleanLastPage();
        addHeaders();

		catsService.get(page, perPage, breed, region, ferocity, cuteness)
			.then(function(result) {
				cats = result.data;

				$.each(cats, function(index) {
					var currentCat = cats[index],
						row = tr.clone(),
                        idCell = td.clone().html(currentCat.id),
						breedCell = td.clone().html(currentCat.breed),
						ferocityCell = td.clone().html(currentCat.ferocityLevel);
                        cutenessCell = td.clone().html(currentCat.cutenessFactor);
                        regionCell = td.clone().html(currentCat.region);

					row.append(idCell, breedCell, ferocityCell, cutenessCell, regionCell);
					catsTable.append(row);
				});

				for (var i = 0; i < result.totalPages; i++) {
					console.log(page);
					var newPage = pageDom.clone();
					newPage
						.children()
						.first()
						.text(i);

					pageList.append(newPage);
				}
			});
	};

    return catsController;
})( new CatsService());
