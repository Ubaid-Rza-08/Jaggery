package com.naresh.repository;

import com.naresh.model.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<PaymentEntity,Long> {
Optional<PaymentEntity>findByRazorpayOrderId(String razorpayOrderId);
}
