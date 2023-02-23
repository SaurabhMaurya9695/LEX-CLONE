package com.lex.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lex.entity.exam.Category;
import com.lex.entity.exam.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long>{
	//creating the method for findBy ___ same name write here in Quiz ;
	
	public List<Quiz>findBycategory(Category category);
	
	
//	we have to written the quiz based on its status
	public List<Quiz> findByActive(Boolean b) ;
	public List<Quiz> findByCategoryAndActive(Category category , Boolean b);   
}
