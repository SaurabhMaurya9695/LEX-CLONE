package com.lex.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lex.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
