package com.lex.entity.exam;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Quiz {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long qid;
	private String title;
	private String description;
	private boolean active=false ;
	private String maxMarks;
	private String noOfQuestions;
	
	//many quiz has one category
	@ManyToOne(fetch = FetchType.EAGER)
	private Category category;
	
	//now developing the relationship with quiz and questions;
	@OneToMany(mappedBy = "quiz" , fetch = FetchType.LAZY , cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Question> questions = new HashSet<>();
	
	
	
	public Set<Question> getQuestions() {
		return questions;
	}
	public void setQuestions(Set<Question> questions) {
		this.questions = questions;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	public Quiz(Long qid, String title, String description, boolean active, String maxMarks, String noOfQuestions) {
		super();
		this.qid = qid;
		this.title = title;
		this.description = description;
		this.active = active;
		this.maxMarks = maxMarks;
		this.noOfQuestions = noOfQuestions;
	}
	public Quiz() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getQid() {
		return qid;
	}
	public void setQid(Long qid) {
		this.qid = qid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public String getMaxMarks() {
		return maxMarks;
	}
	public void setMaxMarks(String maxMarks) {
		this.maxMarks = maxMarks;
	}
	public String getNoOfQuestions() {
		return noOfQuestions;
	}
	public void setNoOfQuestions(String noOfQuestions) {
		this.noOfQuestions = noOfQuestions;
	}
	
}
