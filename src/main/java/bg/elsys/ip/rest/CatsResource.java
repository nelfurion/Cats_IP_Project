package bg.elsys.ip.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

@Path("/cats")
public class CatsResource {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCats() {
		System.out.println("get cats called");
		CatsService CatsService = bg.elsys.ip.rest.CatsService.getInstance();
		
		return Response.ok(CatsService.getCats()).build();
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
