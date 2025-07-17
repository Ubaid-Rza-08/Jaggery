package com.naresh.service;



import com.naresh.Utils;
import com.naresh.dto.PaymentRequest;
import com.naresh.dto.RazorpayVerifyRequest;
import com.naresh.kafka.payment.PaymentConfirmationDTO;
import com.naresh.kafka.payment.PaymentProducer;
import com.naresh.model.PaymentEntity;
import com.naresh.repository.PaymentRepository;
import com.razorpay.Order;

import com.razorpay.RazorpayClient;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class RazorpayService {
private final PaymentRepository paymentRepository;
private final PaymentProducer paymentProducer;
    @Value("${razorpay.key_id}")
    private String keyId;
    @Value("${razorpay.key_secret}")
    private String keySecret;
    public String createOrder(PaymentRequest paymentRequest, @AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> claims = jwt.getClaims();

        try {
            RazorpayClient razorpay = new RazorpayClient(keyId, keySecret);
            JSONObject options = new JSONObject();
            options.put("amount", paymentRequest.amount()); // amount in paise
            options.put("currency", "INR");
            options.put("receipt", "txn_" + System.currentTimeMillis());
            options.put("payment_capture", 1);
            Order order = razorpay.orders.create(options);
          PaymentEntity payment=new PaymentEntity();
          payment.setName(paymentRequest.name());
          payment.setRazorpayOrderId(order.get("id"));
          payment.setUserEmail(paymentRequest.email());
          payment.setStatus("CREATED");
         payment.setOrderReference(paymentRequest.orderReference());
          paymentRepository.save(payment);
          return order.toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Razorpay order", e);
        }
    }
    public boolean verifyPayment(RazorpayVerifyRequest request,@AuthenticationPrincipal Jwt jwt) throws Exception {

        Map<String, Object> claims = jwt.getClaims();

      PaymentEntity paymentEntity=paymentRepository.findByRazorpayOrderId(request.getRazorpay_order_id())
              .orElseThrow(()->new RuntimeException("Payment not found"));
            RazorpayClient razorpay = new RazorpayClient(keyId, keySecret);
            String paymentId = request.getRazorpay_payment_id();
            String orderId = request.getRazorpay_order_id();
            String signature = request.getRazorpay_signature();
            String generatedSignature = Utils.calculateRazorpaySignature(
                    orderId + "|" + paymentId,
                    keySecret
            );
            System.out.println(generatedSignature);

            if (generatedSignature.equals(signature)) {
                JSONObject payment = razorpay.payments.fetch(paymentId).toJson();
                System.out.println(payment);

                paymentEntity.setRazorpayPaymentId(paymentId);
                paymentEntity.setRazorpaySignature(signature);
                Object amountObj = payment.get("amount");
                if (amountObj instanceof Number) {
                    BigDecimal amount = BigDecimal.valueOf(((Number) amountObj).doubleValue());
                    paymentEntity.setAmount(amount);
                }


                paymentEntity.setCurrency(payment.optString("currency",null));
                paymentEntity.setMethod(
                        payment.optString("method", null)
                );
                paymentEntity.setStatus(
                        payment.optString("status", null)
                );
                var savedPayment=paymentRepository.save(paymentEntity);

                paymentProducer.sendPaymentConfirmation(new PaymentConfirmationDTO(paymentEntity.getName(),savedPayment.getOrderReference(),
                        savedPayment.getUserEmail(),savedPayment.getMethod(),
                        savedPayment.getAmount()));

                return true;
            } else {
                paymentEntity.setStatus("FAILED");
                paymentRepository.save(paymentEntity);
                return false;

        }
    }
}
