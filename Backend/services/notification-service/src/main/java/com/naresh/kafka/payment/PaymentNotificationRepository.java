package com.naresh.kafka.payment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentNotificationRepository extends JpaRepository<PaymentConfirmation,String> {

}
