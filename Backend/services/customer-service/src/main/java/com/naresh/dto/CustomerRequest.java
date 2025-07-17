package com.naresh.dto;

import com.naresh.model.Address;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CustomerRequest(
        String name,
        String email,
        String contact,
        List<AddressDTO> address
) {
}
