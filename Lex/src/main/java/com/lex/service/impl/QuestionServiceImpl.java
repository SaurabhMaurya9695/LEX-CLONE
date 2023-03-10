package com.lex.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lex.entity.exam.Question;
import com.lex.entity.exam.Quiz;
import com.lex.repo.QuestionRepository;
import com.lex.service.QuestionService;
@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuestionRepository questionRepository;
	
	@Override
	public Question addQuestion(Question question) {
		return this.questionRepository.save(question);
	}

	@Override
	public Question updateQuestion(Question question) {
		return this.questionRepository.save(question);
	}

	@Override
	public Set<Question> getQuestion() {
		return new HashSet<>( this.questionRepository.findAll());
	}

	@Override
	public Question getQuestion(Long questionId) {
		Question q = this.questionRepository.findById(questionId).get();
		return q;
	}

	@Override
	public Set<Question> getQuestionofQuiz(Quiz quiz) {
		return this.questionRepository.findByQuiz(quiz);
	}

	@Override
	public void deleteQuestion(Long quesId) {
		Question ques = new Question();
		ques.setQuesId(quesId);
		this.questionRepository.delete(ques);
	}

}
