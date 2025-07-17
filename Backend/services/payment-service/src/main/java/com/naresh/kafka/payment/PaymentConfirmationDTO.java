package com.naresh.kafka.payment;

import lombok.AllArgsConstructor;

import java.math.BigDecimal;

public record PaymentConfirmationDTO(
        String name,
        Long orderReference,
        String email,
        String paymentMethod,
        BigDecimal totalAmount
) {

}
