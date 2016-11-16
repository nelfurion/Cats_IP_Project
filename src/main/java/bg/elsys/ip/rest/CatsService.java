package bg.elsys.ip.rest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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
		catList.add(new Cat(1, "Balinese"));
		catList.add(new Cat(2, "Manx"));
		catList.add(new Cat(3, "Munchkin"));
		catList.add(new Cat(1, "Korat"));

	}

	public List<Cat> getCats() {
		return Collections.unmodifiableList(catList);
	}

	public void addCat(Cat Cat) {
		catList.add(Cat);
	}
}
