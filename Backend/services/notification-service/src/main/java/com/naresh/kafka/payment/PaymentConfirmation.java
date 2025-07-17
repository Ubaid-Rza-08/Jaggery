package com.naresh.kafka.payment;

import com.naresh.notification.Notification;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentConfirmation{
       @Id
       private String orderReference;
       private  BigDecimal totalAmount;
       private   String paymentMethod;
       private String email;
    private String name;
      @ManyToOne
    private Notification notification;


}
