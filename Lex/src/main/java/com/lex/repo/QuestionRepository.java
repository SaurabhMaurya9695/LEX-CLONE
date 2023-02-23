package com.lex.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lex.entity.exam.Question;
import com.lex.entity.exam.Quiz;

public interface QuestionRepository extends JpaRepository<Question, Long>{

	Set<Question> findByQuiz(Quiz quiz);

}
