package com.naresh.kafka.order;


import com.naresh.notification.Notification;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderConfirmation {

        @Id
        private String orderReference;
        private String name;
        private String email;
         private UUID userId;
        private BigDecimal totalAmount;

        @OneToMany(mappedBy = "orderConfirmation", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<PurchaseResponse> products = new ArrayList<>();

        @ManyToOne
        @JoinColumn(name = "notification_id")
        private Notification notification;
}
