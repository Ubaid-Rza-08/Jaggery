package com.naresh.client;
import com.naresh.dto.CustomerResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;
@FeignClient(
        name="customer-service",
        url="${application.config.customer-url}"
)
public interface CustomerClient {
    @GetMapping("/getCustomer")
    CustomerResponse getCustomerByUserId(@RequestParam UUID UserId);
}
