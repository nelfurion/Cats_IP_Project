$(document).ready(function () {
	var catsController = new CatsController(),
		catsService = new CatsService(),
		button = $('#button'),
		pageList = $('#pagination'),
		breedInput = $("#breed");

	catsController.getPageData(0, 5, '');

	catsService.getBreeds()
		.then(function (breeds) {
			breedInput.autocomplete({
		      source: breeds,
			  select: function( event, ui ) {
				  catsController.getPageData(0, 5, ui.item.value);
			  }
		    });
		});

	catsService.getRegions()
		.then(function (regions) {
			 populateSelect($('#regions'), regions);
			 console.log(regions);
		});

	catsService.getFerocityLevels()
		.then(function (ferocityLevels) {
			 populateSelect($('#ferocityLevels'), ferocityLevels);
			 console.log(ferocityLevels);
		});

	catsService.getCutenessFactors()
		.then(function (cutenessFactors) {
			 populateSelect($('#cutenessFactors'), cutenessFactors);
			 console.log(cutenessFactors);
		});

	$('select').change(function(){
	    var value = $(this).val();
		catsController.getPageData(
			0,
			5,
			$('#breed').val(),
			$('#regions').val(),
			$('#ferocityLevels').val(),
			$('#cutenessFactors').val());
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

	pageList.on('click', 'a', function(event) {
		event.preventDefault();
		catsController.getPageData($(this).text(), 5, breedInput.val());
	});

	function populateSelect(menu, options) {
		var selectDom = '';
		for (var i=0;i<options.length;i++){
		   selectDom += '<option value="'+ options[i] + '">' + options[i] + '</option>';
		}
		menu.append(selectDom);
	}
});










/*
package bg.elsys.ip.rest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.DefaultValue;

import bg.elsys.ip.rest.PagedResponse;

public class CatsService {
	private static CatsService instance;

	public static CatsService getInstance() {
		if (instance == null) {
			instance = new CatsService();
		}
		return instance;
	}

	private List<Cat> catList = new ArrayList<>();

	public CatsService() {
		//(int id, int ferocityLevel, String breed, String cutenessFactor, String region)
		this.catList.add(new Cat(1, 1, "Balinese", "very", "Europe"));
		this.catList.add(new Cat(2, 1, "Manx", "very", "America"));
		this.catList.add(new Cat(3, 1, "Munchkin","low", "America"));
		this.catList.add(new Cat(4, 1, "Korat", "ok", "Europe"));
		this.catList.add(new Cat(5, 2, "Borat", "ok", "America"));
		this.catList.add(new Cat(6, 2, "American Shorthair", "low", "America"));
		this.catList.add(new Cat(7, 2, "American Wirehairs", "low", "America"));
		this.catList.add(new Cat(8, 2, "Bengal", "very", "America"));
		this.catList.add(new Cat(9, 2, "Birman", "ok", "Europe"));
		this.catList.add(new Cat(10, 3, "Americal Bobtail", "very", "America"));
		this.catList.add(new Cat(11, 3, "Ragdoll", "ok", "Europe"));
		this.catList.add(new Cat(12, 3, "Russian Blue", "low", "Europe"));
		this.catList.add(new Cat(13, 3, "Scottish Fold", "low", "Europe"));
	}

	public PagedResponse getCatsOnPage(
			int page,
			int perPage,
			String breed,
			String region,
			String cuteness,
			int ferocity = 0) {
		List<Cat> filteredCats =
				this.catList
				.stream()
				.filter(c -> c.getBreed().contains(breed))
				.collect(Collectors.toList());

		/*if (region) {
			filteredCats =
					filteredCats
					.stream()
					.filter(c -> c.getRegion().equals(region));
		}

		if (cuteness) {
			filteredCats =
					filteredCats
					.stream()
					.filter(c -> c.getCutenessFactor().equals(cuteness));
		}

		if (ferocity != 0) {
			filteredCats =
					filteredCats
					.stream()
					.filter(c -> c.getFerocityLevel() == ferocity)

		}*/
/*
		List<Cat> catsOnPage =
			filteredCats
			.stream()
			.skip(page * perPage)
			.limit(perPage)
			.collect(Collectors.toList());

		int totalPages = (int) Math.ceil(((double) filteredCats.size()) / perPage);

		return new PagedResponse(catsOnPage, page, totalPages);
	}

	public List<String> getDistinctRegions() {
		return this
				.catList
				.stream()
				.map((c) -> c.getRegion())
				.distinct()
				.collect(Collectors.toList());
	}

	public List<String> getDistinctCutenessFactors() {
		return this
				.catList
				.stream()
				.map((c) -> c.getCutenessFactor())
				.distinct()
				.collect(Collectors.toList());
	}

	public List<Integer> getDistinctFerocityLevels() {
		return this
				.catList
				.stream()
				.map((c) -> c.getFerocityLevel())
				.distinct()
				.collect(Collectors.toList());
	}

	public List<String> getDistinctBreeds() {
		return this
				.catList
				.stream()
				.map((c) -> c.getBreed())
				.distinct()
				.collect(Collectors.toList());
	}

	public void addCat(Cat Cat) {
		catList.add(Cat);
	}
}



*/




















/*







resource*/
















/*
package bg.elsys.ip.rest;

import io.swagger.annotations.ApiOperation;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

@Path("/cats")
public class CatsResource {

	@GET
	@ApiOperation(value = "Get a specified number of cats on a selected page which breed contains the given string.")
	@Produces(MediaType.APPLICATION_JSON)
	public PagedResponse getCats(
			@DefaultValue("0") @QueryParam("page") int page,
			@DefaultValue("5") @QueryParam("perPage") int perPage,
			@QueryParam("breed") String breed,
			@QueryParam("region") String region,
			@QueryParam("ferocityLevel") int ferocity,
			@QueryParam("cutenessFactor") String cuteness) {

		return CatsService
				.getInstance()
				.getCatsOnPage(
						page,
						perPage,
						breed,
						region,
						cuteness,
						ferocity);
	}

	@GET
	@Path("/breeds")
	@ApiOperation(value="Get all distinct cat breeds.")
	@Produces(MediaType.APPLICATION_JSON)
	public List<String> getDistinctBreeds() {
		return CatsService
				.getInstance()
				.getDistinctBreeds();
	}

	@GET
	@Path("/regions")
	@ApiOperation(value="Get all distinct cat breeds.")
	@Produces(MediaType.APPLICATION_JSON)
	public List<String> getDistinctRegions() {
		return CatsService
				.getInstance()
				.getDistinctRegions();
	}

	@GET
	@Path("/cutenessFactors")
	@ApiOperation(value="Get all distinct cat breeds.")
	@Produces(MediaType.APPLICATION_JSON)
	public List<String> getDistinctCutenessFactors() {
		return CatsService
				.getInstance()
				.getDistinctCutenessFactors();
	}

	@GET
	@Path("/ferocityLevels")
	@ApiOperation(value="Get all distinct cat breeds.")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Integer> getDistinctFerocityLevels() {
		return CatsService
				.getInstance()
				.getDistinctFerocityLevels();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createCat(Cat cat) {
		System.out.println("POSTED TO CATS");
		System.out.println(cat.getBreed());
		CatsService.getInstance().addCat(cat);

		return Response.ok(cat).status(Status.CREATED).build();
	}
}
*/
