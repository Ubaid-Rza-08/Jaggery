package com.naresh.config;

import com.naresh.entity.UserEntity;
import com.naresh.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component

public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private  UserEntityRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity=repository.findByEmail(email).orElseThrow(()->
            new RuntimeException("User Not Found with name :"+email)
        );
        return new CustomUserDetails(userEntity);
    }
}
