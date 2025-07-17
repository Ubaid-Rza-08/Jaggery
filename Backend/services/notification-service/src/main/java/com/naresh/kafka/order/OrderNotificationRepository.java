package com.naresh.kafka.order;


import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderNotificationRepository extends JpaRepository<OrderConfirmation,String> {
}
