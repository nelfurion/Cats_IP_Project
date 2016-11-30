package bg.elsys.ip.rest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
			int ferocity,
			String cuteness) {
		
		List<Cat> filteredCats = 
				this.catList
				.stream()
				.filter(c -> c.getBreed().contains(breed))
				.collect(Collectors.toList());
		
		if (region != null && !region.isEmpty()) {
		filteredCats =
				filteredCats
				.stream()
				.filter(c -> c.getRegion().equals(region))
				.collect(Collectors.toList());
		}
	
		if (cuteness != null && !cuteness.isEmpty()) {
			filteredCats =
					filteredCats
					.stream()
					.filter(c -> c.getCutenessFactor().equals(cuteness))
					.collect(Collectors.toList());
		}
	
		if (ferocity != 0) {
			filteredCats =
					filteredCats
					.stream()
					.filter(c -> c.getFerocityLevel() == ferocity)
					.collect(Collectors.toList());
	
		}
		
		List<Cat> catsOnPage = 
			filteredCats
			.stream()
			.skip(page * perPage)
			.limit(perPage)
			.collect(Collectors.toList());;

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
