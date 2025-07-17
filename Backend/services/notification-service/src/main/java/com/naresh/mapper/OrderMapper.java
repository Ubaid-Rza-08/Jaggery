package com.naresh.mapper;

import com.naresh.kafka.order.OrderConfirmation;
import com.naresh.kafka.order.OrderConfirmationDTO;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    public OrderConfirmation toOrderConfirmation(OrderConfirmationDTO orderConfirmationDTO){
        return OrderConfirmation.builder()
                .orderReference(orderConfirmationDTO.orderReference())
                .email(orderConfirmationDTO.email())
                .totalAmount(orderConfirmationDTO.totalAmount())
                .products(orderConfirmationDTO.products())
                .build();
    }

}
