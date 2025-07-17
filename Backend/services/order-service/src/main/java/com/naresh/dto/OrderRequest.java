package com.naresh.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.naresh.model.PaymentMethod;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
public record OrderRequest(
        @Positive(message="order amount should be positive")
        BigDecimal totalAmount,
        @NotNull(message="customer should be present")
        @NotEmpty(message="you should at least purchase one product")
        List<PurchaseRequest> products
) {
}
