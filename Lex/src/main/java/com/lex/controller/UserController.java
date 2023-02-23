package com.lex.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.lex.entity.Role;
import com.lex.entity.User;
import com.lex.entity.UserRole;
import com.lex.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder bCryptPasswordEncoder ;
	
	
	@GetMapping("/test")
	public String test() {
		return "Hello Everyone Dekho Mujhe" ;
	}

	// creating the user
	@PostMapping("/")
	public User createUser(@RequestBody User user) throws Exception {

		user.setProfile("default.jpg");
		user.setFirstName(user.getFirstName());
		user.setLastName(user.getLastName());
		//setting the bcrypt password encode
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		
		Set<UserRole> userRoles = new HashSet<>();
		// we want only one user is Admin and rest of the user is Normal user;
		// first we have to create role then set to the userroles
		Role role = new Role();
		role.setRoleId(45L); // 44 for admin and 45 for Normal user;
		role.setRoleName("NORMAL");

		// first set user and after then set role
		UserRole ur = new UserRole();
		ur.setRole(role);
		ur.setUser(user);

		// set ur to user role;
		userRoles.add(ur);

		System.out.println(user.getFirstName() + " " + user.getLastName());
		return this.userService.createUser(user, userRoles);
		
	}

	// get the user details
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username) throws Exception {
		User gettingUser = this.userService.getUser(username);
		if (gettingUser == null) {
			throw new Exception("USER_NOT_PRESENT");
		} else {
			return gettingUser;
		}

	}

	// delete userByUsername

	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId") Long userId) throws Exception {
		this.userService.deleteUser(userId);

	}
}
