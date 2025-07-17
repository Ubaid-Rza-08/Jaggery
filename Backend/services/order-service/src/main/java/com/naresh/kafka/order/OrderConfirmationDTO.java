package com.naresh.kafka.order;

import com.naresh.dto.PurchaseResponse;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record OrderConfirmationDTO(
        UUID userId,
        Long orderReference,
        String name,
        String email,
        BigDecimal totalAmount,
        List<PurchaseResponse>products
) {
}
