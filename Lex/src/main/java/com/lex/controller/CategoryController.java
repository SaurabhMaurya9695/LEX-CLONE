package com.lex.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lex.entity.exam.Category;
import com.lex.service.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	//addCategory
	@PostMapping("/")
	public ResponseEntity<?> addCategory(@RequestBody Category category)
	{
		Category cat1 =  this.categoryService.addCategory(category);
		return ResponseEntity.ok(cat1);
	}
	
	//getcategory 
	@GetMapping("/{categoryId}")
	public Category getCategory(@PathVariable("categoryId") Long CategoryId)
	{
		return this.categoryService.getCategory(CategoryId);
	}
	
	//getAllCategory
	@GetMapping("/")
	public ResponseEntity<?> getCategory(){
		return ResponseEntity.ok(this.categoryService.getCategories());
	}
	
	//UpdateCategory
	@PutMapping("/")
	public ResponseEntity<?> updateCategory(@RequestBody Category category) // this is comes in JSON format
	{
		return ResponseEntity.ok(this.categoryService.updateCategory(category));
	}
	
	//deleteCategory
	@DeleteMapping("/{categoryId}")
	public void deleteCategory(@PathVariable("categoryId") Long cid)
	{
		this.categoryService.deleteCategory(cid);
	}
	
}
