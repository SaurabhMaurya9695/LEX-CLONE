package com.lex.service;

import java.util.Set;

import com.lex.entity.User;
import com.lex.entity.UserRole;

public interface UserService {

//	createing user 
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;

	// get UserByusername
	public User getUser(String username);

	// delete userByusername ;
	public void deleteUser(Long userId);

}
