package com.naresh.dto;

import com.naresh.model.Order;

public record OrderLineRequest(

        Order order,
        @jakarta.validation.constraints.NotNull(message = "Product is mandatory") Long productId,
        double quantity
) {
}
