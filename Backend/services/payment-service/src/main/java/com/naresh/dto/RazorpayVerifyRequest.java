package com.naresh.dto;

import lombok.Data;

@Data
public class RazorpayVerifyRequest {
    private String razorpay_order_id;
    private String razorpay_payment_id;
    private String razorpay_signature;

    // getters and setters
}
