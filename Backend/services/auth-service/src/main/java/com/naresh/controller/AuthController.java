package com.naresh.controller;

import com.naresh.dto.AuthRequest;
import com.naresh.dto.LoginResponse;
import com.naresh.entity.UserEntity;
import com.naresh.service.AuthService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserEntity userEntity){
        return new ResponseEntity<>(authService.saveUser(userEntity), HttpStatus.OK);
    }
    @PostMapping("/token")
    public ResponseEntity<LoginResponse> getToken(@RequestBody AuthRequest authRequest){
        Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(),authRequest.getPassword()));
        if(authentication.isAuthenticated()){
            LoginResponse token= authService.generateToken(authRequest);
            return new ResponseEntity<>(token,HttpStatus.OK);
        }else {
            throw new RuntimeException("Invalid access");
        }
    }
    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        authService.validateToken(token);
        return "Token is valid";
    }

}
