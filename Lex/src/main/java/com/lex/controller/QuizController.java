package com.lex.controller;

import java.util.List;

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
import com.lex.entity.exam.Quiz;
import com.lex.service.QuizService;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {
	
	@Autowired
	private QuizService quizService;
	
	// Adding the quiz
	@PostMapping("/")
	public ResponseEntity<?> addQuiz(@RequestBody Quiz quiz)
	{
		return ResponseEntity.ok(this.quizService.addQuiz(quiz));
	}
	
	//get all quizzes 
	@GetMapping("/")
	public ResponseEntity<?> getAllQuiz()
	{
		return ResponseEntity.ok(this.quizService.getQuizzes());
	}
	
//	/Update Quiz
	@PutMapping("/")
	public ResponseEntity<?> UpdateQuiz(@RequestBody Quiz quiz)
	{
		return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
	}
	
	//getOneQuiz
	@GetMapping("/{qid}")
	public Quiz getQuiz(@PathVariable("qid") Long qid)
	{
		return this.quizService.getQuiz(qid);
	}
	
	//deleteb the quiz
	@DeleteMapping("/{qid}")
	public void deleteQuiz(@PathVariable("qid") Long qid)
	{
	     this.quizService.deleteQuiz(qid);
	}
	
	//load all quizzes based on the given category
	
	@GetMapping("/category/{cid}")
	public ResponseEntity<?> getQuizBasedOnCategory(@PathVariable("cid") Long cid)
	{
		Category category = new Category();
		category.setCid(cid);
		List<Quiz>  lst  =this.quizService.getQuizzesOfCategory(category);
		return ResponseEntity.ok(lst); 
	}
	
	@GetMapping("/active")
	public List<Quiz> getActiveQuiz()
	{
		return this.quizService.getActiveQuizzes();
	}
	@GetMapping("/category/active/{cid}")
	public List<Quiz> getCategoryActiveQuiz(@PathVariable("cid") Long cid)
	{
		Category c = new Category();
		c.setCid(cid);
		return this.quizService.getActiveQuizOfCategory(c);
	}
}







