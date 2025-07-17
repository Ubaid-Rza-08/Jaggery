package com.naresh.dto;

import com.naresh.model.Address;

import java.util.List;
import java.util.UUID;

public record CustomerResponse(
        UUID userId,
        String name,
        String email,
        String contact
) {
}
