package com.naresh.dto;

import java.math.BigDecimal;

public record PurchaseResponse(
        Long id,
        String name,
        String description,
        BigDecimal price,
        double quantity
) {
}
