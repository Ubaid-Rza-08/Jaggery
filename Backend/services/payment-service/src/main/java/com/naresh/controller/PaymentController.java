package com.naresh.controller;

import com.naresh.dto.PaymentRequest;
import com.naresh.dto.RazorpayVerifyRequest;

import com.naresh.service.RazorpayService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/payment")
public class PaymentController {

    private final RazorpayService service;

    @PostMapping("/create-order")
    ResponseEntity<String> requestOrderPayment(
            @RequestBody @Valid PaymentRequest request, @AuthenticationPrincipal Jwt jwt
            ) {
        try {
            return ResponseEntity.ok(service.createOrder(request,jwt));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());

        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody RazorpayVerifyRequest request,@AuthenticationPrincipal Jwt jwt) throws Exception {

            boolean verified = service.verifyPayment(request,jwt);
            return ResponseEntity.ok(Map.of("Success", verified));

    }
}