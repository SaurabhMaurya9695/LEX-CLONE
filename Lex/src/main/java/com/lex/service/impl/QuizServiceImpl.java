package com.lex.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lex.entity.exam.Category;
import com.lex.entity.exam.Quiz;
import com.lex.repo.QuizRepository;
import com.lex.service.QuizService;
@Service
public class QuizServiceImpl implements QuizService{

	@Autowired
	private QuizRepository quizRepository;
	
	@Override
	public Quiz addQuiz(Quiz quiz) {
		return this.quizRepository.save(quiz);
	}

	@Override
	public Quiz updateQuiz(Quiz quiz) {
		return this.quizRepository.save(quiz);
	}

	@Override
	public Set<Quiz> getQuizzes() {
		return new HashSet<> ( this.quizRepository.findAll());
	}

	@Override
	public Quiz getQuiz(Long quizId) {
		return this.quizRepository.findById(quizId).get();
	}

	@Override
	public void deleteQuiz(Long quizId) {
		this.quizRepository.deleteById(quizId);		
	}

	@Override
	public List<Quiz> getQuizzesOfCategory(Category category) {
		return this.quizRepository.findBycategory(category);
	}
	
	//get Active Quizzes
	@Override
	public List<Quiz> getActiveQuizzes()
	{
		return this.quizRepository.findByActive(true);
	}
	
	@Override
	public List<Quiz> getActiveQuizOfCategory(Category c)
	{
		return this.quizRepository.findByCategoryAndActive(c, true);
	}
	

}
