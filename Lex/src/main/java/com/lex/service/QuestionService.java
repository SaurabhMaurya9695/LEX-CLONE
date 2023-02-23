package com.lex.service;

import java.util.Set;

import com.lex.entity.exam.Question;
import com.lex.entity.exam.Quiz;

public interface QuestionService {
	public Question addQuestion(Question question);
	public Question updateQuestion(Question question);
	public Set<Question> getQuestion();
	public Question getQuestion(Long questionId);
	public Set<Question> getQuestionofQuiz(Quiz quiz); // get the all questions of quiz
	public void deleteQuestion(Long quesId);
}
