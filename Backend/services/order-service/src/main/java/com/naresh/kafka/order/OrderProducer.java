package com.naresh.kafka.order;

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
public class OrderProducer {
    private final KafkaTemplate<String, OrderConfirmationDTO>kafkaTemplate;
    public void sendOrderConfirmation(OrderConfirmationDTO orderConfirmationDTO){
        log.info("Sending order confirmation");
        Message<OrderConfirmationDTO> message= MessageBuilder
                .withPayload(orderConfirmationDTO)
                .setHeader(TOPIC,"order-topic")
                .build();
        kafkaTemplate.send(message);
    }

}
