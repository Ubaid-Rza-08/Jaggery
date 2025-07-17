package com.naresh.kafka.payment;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import static org.springframework.kafka.support.KafkaHeaders.TOPIC;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentProducer {
    private final KafkaTemplate<String,PaymentConfirmationDTO>kafkaTemplate;
    public void sendPaymentConfirmation(PaymentConfirmationDTO paymentConfirmation){
        log.info("Sending payment confirmation");
        Message<PaymentConfirmationDTO> message= MessageBuilder
                .withPayload(paymentConfirmation)
                .setHeader(TOPIC,"payment-topic")
                .build();
        kafkaTemplate.send(message);
    }
}
