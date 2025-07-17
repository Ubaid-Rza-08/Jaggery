package com.naresh.dto;

import com.naresh.model.Category;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.math.BigDecimal;

public record ProductRequest(
        String name,
        String image,
        String description,
        double stock,
        BigDecimal price,
        String ingredients

        ) {
}
