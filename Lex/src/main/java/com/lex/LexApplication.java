package com.lex;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.lex.entity.Role;
import com.lex.entity.User;
import com.lex.entity.UserRole;
import com.lex.service.UserService;

@SpringBootApplication
public class LexApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(LexApplication.class, args);
	}

	// BY CMDRunner we get a specific area where i can run my code;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder bCryptPasswordEncoder ;
	@Override
	public void run(String... args) throws Exception {

		System.out.println("working ");
		
					// do this only one time to create Admin User;
		//setting up tha data
//		try {
//			User user = new User();
//			user.setEmail("saurabhyash1707@gmail.com");
//			user.setFirstName("Saurabh");
//			user.setLastName("Maurya");
//			user.setPassword(this.bCryptPasswordEncoder.encode("Saurabh@1234"));
//			user.setPhone("6392272716");
//			user.setUsername("Saurabh");
//			
//			//creating the roles
//			Role role1 = new Role();
//			role1.setRoleName("ADMIN");
//			role1.setRoleId(44L);
//			
//			// assigning these roles to the user;
//			Set<UserRole> userRoleSet = new HashSet<>();
//			UserRole us = new UserRole();
//			//first set the role and user then get the data
//			us.setRole(role1);
//			us.setUser(user);
//			userRoleSet.add(us);
//			
//			// then we have all the necessary files then now create user using service;
//			User createdUser = this.userService.createUser(user, userRoleSet);
//			System.out.println(createdUser.getUsername());
//		}
//		catch (Exception e) {
//			throw new Exception("User ALready exist");
//		} 
		
	}

}
