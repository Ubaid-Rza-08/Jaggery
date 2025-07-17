package com.naresh.kafka.payment;

import java.math.BigDecimal;

public record PaymentConfirmationDTO(
        String name,
        String orderReference,
        String email,
        String paymentMethod,
        BigDecimal totalAmount
) {
}
