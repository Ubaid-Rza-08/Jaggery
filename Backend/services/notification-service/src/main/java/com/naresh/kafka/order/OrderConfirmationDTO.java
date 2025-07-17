package com.naresh.kafka.order;

import jakarta.persistence.OneToMany;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record OrderConfirmationDTO(
        UUID userId,
        String name,
        String orderReference,
        String email,
         BigDecimal totalAmount,
         List<PurchaseResponse>products

) {
}
