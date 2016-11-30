package bg.elsys.ip.rest;

import io.swagger.annotations.Api;
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
@Api("Cats")
public class CatsResource {

	@GET
	@ApiOperation(value = "Get a specified number of cats on a selected page which breed contains the given string.")
	@Produces(MediaType.APPLICATION_JSON)
	public PagedResponse getCats(
			@DefaultValue("0") @QueryParam("page") int page,
			@DefaultValue("5") @QueryParam("perPage") int perPage,
			@QueryParam("breed") String breed,
			@QueryParam("region") String region,
			@DefaultValue("0") @QueryParam("ferocityLevel") int ferocity,
			@QueryParam("cutenessFactor") String cuteness) {

		return CatsService
				.getInstance()
				.getCatsOnPage(
						page, 
						perPage, 
						breed,
						region,
						ferocity,
						cuteness);
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
	@ApiOperation(value="Get all distinct cat regions.")
	@Produces(MediaType.APPLICATION_JSON)
	public List<String> getDistinctRegions() {
		return CatsService
				.getInstance()
				.getDistinctRegions();
	}
	
	@GET
	@Path("/cutenessFactors")
	@ApiOperation(value="Get all distinct cat cuteness.")
	@Produces(MediaType.APPLICATION_JSON)
	public List<String> getDistinctCutenessFactors() {
		return CatsService
				.getInstance()
				.getDistinctCutenessFactors();
	}
	
	@GET
	@Path("/ferocityLevels")
	@ApiOperation(value="Get all distinct cat ferocities.")
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
