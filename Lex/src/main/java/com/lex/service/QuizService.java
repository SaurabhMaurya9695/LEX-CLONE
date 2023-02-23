package com.lex.service;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.lex.entity.exam.Category;
import com.lex.entity.exam.Quiz;

public interface QuizService {
	public Quiz addQuiz(Quiz quiz);
	public Quiz updateQuiz(Quiz quiz);
	public Set<Quiz> getQuizzes();
	public Quiz getQuiz(Long quizId);
	public void deleteQuiz(Long quizId);
	
	//it should return list of quizzes
	public List<Quiz> getQuizzesOfCategory(Category category);
	public  List<Quiz> getActiveQuizzes();
	public List<Quiz> getActiveQuizOfCategory(Category c);
}
