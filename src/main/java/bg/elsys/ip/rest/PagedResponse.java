package bg.elsys.ip.rest;

import java.util.ArrayList;
import java.util.List;

public class PagedResponse {
	
	private List<Cat> data = new ArrayList<>();
	
	private int page;
	private int totalPages;
	
	
	public PagedResponse(List<Cat> data, int page, int totalPages) {
		this.data = data;
		this.page = page;
		this.totalPages = totalPages;
	}
	
	public List<Cat> getData() {
		return data;
	}
	public void setData(List<Cat> data) {
		this.data = data;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
}
