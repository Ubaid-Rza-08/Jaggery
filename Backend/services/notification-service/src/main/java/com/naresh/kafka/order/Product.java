package com.naresh.kafka.order;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.math.BigDecimal;
@Embeddable
@Data
public class Product{
        Long productId;
        String name;
        String description;
        BigDecimal price;
        double quantity;

}
