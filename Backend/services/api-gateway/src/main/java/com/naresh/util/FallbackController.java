package com.naresh.util;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FallbackController {
    @RequestMapping("/fallback/product")
    public ResponseEntity<String> productFallback() {
        return ResponseEntity.ok("Product Service is temporarily unavailable. Please try again later.");
    }
}
