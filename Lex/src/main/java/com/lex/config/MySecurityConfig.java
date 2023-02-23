package com.lex.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.lex.service.impl.UserDetailsServiceImpl;
//Step -> 1
@Configuration
@EnableWebSecurity
@EnableWebMvc
public class MySecurityConfig {

	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@SuppressWarnings("deprecation")
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
//		return NoOpPasswordEncoder.getInstance();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.csrf()
				.disable()
				.cors()
				.disable()
				.authorizeHttpRequests()
				.requestMatchers("/generate-token" , "/user/" , "/user/test").permitAll()
				.requestMatchers(HttpMethod.OPTIONS).permitAll()
				.anyRequest().authenticated()
				.and()
				.exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
				.and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
			http.addFilterBefore(jwtAuthenticationFilter , UsernamePasswordAuthenticationFilter.class);
			http.authenticationProvider(daoAuthenticationProvider());
		return http.build();

	}

//	@Bean
//	public void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(this.userDetailsServiceImpl).passwordEncoder(passwordEncoder());
//	}
	
	@Bean
	public DaoAuthenticationProvider daoAuthenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(this.userDetailsServiceImpl);
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}
	
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

}
