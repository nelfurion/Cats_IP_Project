package bg.elsys.ip.rest;

public class Cat {
	
	private int id;
	private int ferocityLevel;
	private String breed;
	private String region;
	private String cutenessFactor;

	public Cat() {
	}

	public Cat(int id, int ferocityLevel, String breed, String cutenessFactor, String region) {
		super();
		this.id = id;
		this.breed = breed;
		this.region = region;
		this.cutenessFactor = cutenessFactor;
		this.ferocityLevel = ferocityLevel;
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
	
	public int getFerocityLevel() {
		return this.ferocityLevel;
	}
	
	public String getCutenessFactor() {
		return this.cutenessFactor;
	}
	
	public String getRegion() {
		return this.region;
	}
}
