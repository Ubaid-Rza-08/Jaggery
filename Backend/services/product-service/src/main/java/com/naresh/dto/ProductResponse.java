package com.naresh.dto;

import java.math.BigDecimal;

public record ProductResponse(
        Long id,
        String name,
        String image,
        String description,
        double stock,
        BigDecimal price,
        String ingredients
) {
}
