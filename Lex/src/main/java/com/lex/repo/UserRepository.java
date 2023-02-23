package com.lex.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lex.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	//creating function to findbyuserName
	public User findByUsername(String username);
	
	public void deleteByUsername(String username);
}
