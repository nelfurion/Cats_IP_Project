$(document).ready(function() {
	var button = $('#button'),
	catsTable = $('#catsTable'),
	tr = $('<tr>'),
	td = $('<td>'),
	catsService = new CatsService();
	
	catsService.get()
		.then(function(cats) {
			$.each(cats, function(index) {
				var row = tr.clone();
				row.append(td.clone().html(cats[index].id));
				row.append(td.clone().html(cats[index].breed));
				catsTable.append(row);
			});
		});
	
	button.on('click', function(event) {
		var cat = {
			id: Math.floor(Math.random() * 1000),
			breed: $('#breed').val()
		};
		
		catsService.add(cat)
			.then(function(cat) {
				window.location.href = "http://localhost:8080/rst2";
			});
	});
});