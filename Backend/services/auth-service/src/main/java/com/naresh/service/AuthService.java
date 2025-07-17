package com.naresh.service;


import com.naresh.dto.AuthRequest;
import com.naresh.dto.LoginResponse;
import com.naresh.entity.UserEntity;
import com.naresh.repository.UserEntityRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserEntityRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String saveUser(UserEntity userEntity){
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        UserEntity savedUser=repository.save(userEntity);
        return savedUser.getEmail();
    }
    public LoginResponse generateToken(AuthRequest authRequest){
        UserEntity userEntity=repository.findByEmail(authRequest.getEmail()).orElseThrow(()->{
            throw new RuntimeException("user not found");
        });
        String token=jwtService.generateToken(userEntity);
        return new LoginResponse(token);

    }
    public  void validateToken(String token){
        jwtService.validateToken(token);
    }
    public Map<String,Object> validateAndExtractClaims(String token){
      return   jwtService.validateAndExtractClaims(token);
    }
}
