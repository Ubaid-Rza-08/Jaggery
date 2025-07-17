package com.naresh.notification;
import com.naresh.email.EmailService;
import com.naresh.kafka.order.OrderConfirmationDTO;
import com.naresh.kafka.payment.PaymentConfirmationDTO;
import com.naresh.mapper.PaymentMapper;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationConsumer {
    private final NotificationRepository repository;
    private final EmailService emailService;
    private final PaymentMapper paymentMapper;

    @KafkaListener(topics = "order-topic",groupId = "notificationGroup")
    public void consumeOrderSuccessNotification(OrderConfirmationDTO orderConfirmationDTO) throws MessagingException {
        log.info("Consuming the message from order-topic");
        emailService.sendOrderConfirmation(orderConfirmationDTO);
    }
    @Transactional
    @KafkaListener(topics = "payment-topic",groupId = "notificationGroup")
    public void consumePaymentSuccessNotification(PaymentConfirmationDTO paymentConfirmationDTO) throws MessagingException {
        log.info("Consuming the message from payment-topic");
        emailService.sendPaymentConfirmation(paymentConfirmationDTO);
    }
}
