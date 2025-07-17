package com.naresh.kafka.order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
public class PurchaseResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
   private Long id;
    private  String name;
    private String description;
    private  BigDecimal price;
    private  double quantity;
    @ManyToOne
    @JsonIgnore
    private OrderConfirmation orderConfirmation;

}
