package com.naresh.dto;

public record LoginRequest(
        String email,
        String password
) {
}
