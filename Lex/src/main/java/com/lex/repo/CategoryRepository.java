package com.lex.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lex.entity.exam.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	
}
