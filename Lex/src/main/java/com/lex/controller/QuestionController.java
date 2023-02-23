package com.lex.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
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

import com.lex.entity.exam.Question;
import com.lex.entity.exam.Quiz;
import com.lex.service.QuestionService;
import com.lex.service.QuizService;

import io.jsonwebtoken.lang.Collections;
import java.util.*;
@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

	@Autowired 
	private QuestionService questionService;
	@Autowired 
	private QuizService quizService;
	
	//addQuestion 
	@PostMapping("/")
	public ResponseEntity<?> addQuestion(@RequestBody Question question)
	{
		return ResponseEntity.ok(this.questionService.addQuestion(question));
	}
	
	//getAllQuestion
	@GetMapping("/")
	public ResponseEntity<?> getAllQuiz()
	{
		return ResponseEntity.ok(this.questionService.getQuestion());
	}
	
	//getOneQuestion
	@GetMapping("/{quesId}")
	public Question getQuestion(@PathVariable("quesId") Long quesId)
	{
		return this.questionService.getQuestion(quesId);
	}
	
	//updateQuiz
	@PutMapping("/")
	public ResponseEntity<?> UpdateQuesion(@RequestBody Question  question)
	{
		return ResponseEntity.ok(this.questionService.updateQuestion(question));
	}
	
	//deleteQuestions
	@DeleteMapping("/{quesId}")
	public void deleteQuestion(@PathVariable("quesId") Long quesId)
	{
		 this.questionService.deleteQuestion(quesId);
	}
	
	//get ALL question of any Quiz
	@GetMapping("/quiz/{qid}")
	public ResponseEntity<?> getAllQuestionOfQuiz(@PathVariable("qid") Long qid)
	{
//		Quiz quiz = new Quiz();
//		quiz.setQid(qid);
//		return ResponseEntity.ok(this.questionService.getQuestionofQuiz(quiz));
		
		Quiz quiz = this.quizService.getQuiz(qid);
		Set<Question> x = quiz.getQuestions();
		List lit = new ArrayList(x);
		if(lit.size() > Integer.parseInt(quiz.getNoOfQuestions()))
		{
			lit = lit.subList(0, Integer.parseInt(quiz.getNoOfQuestions() + 1) );
		}
//		Collections.shuffle(lit);
		return ResponseEntity.ok(lit);
	}
	@GetMapping("/quiz/all/{qid}")
	public ResponseEntity<?> getAllQuestionOfQuizAdmin(@PathVariable("qid") Long qid)
	{
		Quiz quiz = new Quiz();
		quiz.setQid(qid);
		Set<Question> st = this.questionService.getQuestionofQuiz(quiz);
		return ResponseEntity.ok(st);
	}
}

























