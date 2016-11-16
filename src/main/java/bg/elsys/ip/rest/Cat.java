package bg.elsys.ip.rest;

public class Cat {
	
	private int id;
	private String breed;

	public Cat() {
	}

	public Cat(int id, String breed) {
		super();
		this.id = id;
		this.breed = breed;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public void setBreed(String breed) {
		this.breed = breed;
	}
	
	public String getBreed() {
		return this.breed;
	}
}
