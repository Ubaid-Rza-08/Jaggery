package com.naresh.notification;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.naresh.kafka.order.OrderConfirmation;
import com.naresh.kafka.payment.PaymentConfirmation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    @JsonIgnore
    @OneToMany(mappedBy = "notification",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderConfirmation> orderConfirmations=new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "notification",cascade = CascadeType.ALL)
    private List<PaymentConfirmation>paymentConfirmations=new ArrayList<>();

}
