package com.naresh.dto;

import java.math.BigDecimal;

public record PaymentRequest(
        String name,
        String email,
        BigDecimal amount,
        Long orderReference

) {
}
