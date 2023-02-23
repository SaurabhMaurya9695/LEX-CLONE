package com.lex.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lex.entity.User;
import com.lex.repo.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	
	@Autowired
	private UserRepository userRepository ;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = this.userRepository.findByUsername(username);
		if(user == null) {
			System.out.println("User is Not present");
			throw new UsernameNotFoundException("User Not Found !!!");
		}
		else {
			return user;
		}
	}

}
