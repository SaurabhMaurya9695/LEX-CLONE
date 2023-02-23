package com.lex.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lex.entity.exam.Category;
import com.lex.repo.CategoryRepository;
import com.lex.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public Category addCategory(Category category) {
		return this.categoryRepository.save(category); // same function two uses;
	}

	@Override
	public Category updateCategory(Category category) {
		
		return this.categoryRepository.save(category);
	}

	@Override
	public Set<Category> getCategories() {
		
		return new HashSet<>( this.categoryRepository.findAll());
	}

	@Override
	public Category getCategory(Long categoryId) {
		
		return this.categoryRepository.findById(categoryId).get();
	}

	@Override
	public void deleteCategory(Long categoryId) {
		this.categoryRepository.deleteById(categoryId);
		
	}

}
