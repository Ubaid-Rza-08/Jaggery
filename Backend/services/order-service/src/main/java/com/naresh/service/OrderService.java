package com.naresh.service;

import com.naresh.client.CustomerClient;
import com.naresh.client.PaymentClient;
import com.naresh.client.ProductClient;
import com.naresh.dto.*;

import com.naresh.kafka.order.OrderConfirmationDTO;
import com.naresh.kafka.order.OrderProducer;
import com.naresh.mapper.OrderMapper;
import com.naresh.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductClient productClient;
    private  final OrderMapper mapper;
    private final PaymentClient paymentClient;
    private final CustomerClient customerClient;
    private final OrderProducer orderProducer;
    private final OrderLineService orderLineService;
    public String createOrder(OrderRequest request, Jwt jwt){
        Map<String, Object> claims = jwt.getClaims();
        String sub = (String) claims.get("sub");
        if (sub == null) {
            throw new IllegalArgumentException("JWT token does not contain 'sub' claim");
        }
        UUID userId;
        try {
            userId = UUID.fromString(sub);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid UUID format in 'sub' claim: " + sub, e);
        }
        CustomerResponse customer = customerClient.getCustomerByUserId(userId);
        var purchasedProduct=productClient.purchaseProduct(request.products());
        var order=mapper.toOrder(request);
        order.setUserId(UUID.fromString(claims.get("sub").toString()));
        var savedOrder=this.orderRepository.save(order);
        for(PurchaseRequest purchaseRequest:request.products()){
            orderLineService.saveOrderLine(
                    new OrderLineRequest(
                            savedOrder,
                            purchaseRequest.productId(),
                            purchaseRequest.quantity())
            );}
            var paymentRequest=new PaymentRequest(
                    customer.name(), customer.email(),
                    request.totalAmount(),
                   order.getId());
           String paymentResponse= paymentClient.requestOrderPayment(paymentRequest);
            orderProducer.sendOrderConfirmation(new OrderConfirmationDTO(customer.userId(),
                    order.getId(),customer.name(),customer.email(), request.totalAmount(),purchasedProduct));
    return paymentResponse;
}
    public List<OrderResponse> findAllOrders() {
        return this.orderRepository.findAll()
                .stream()
                .map(this.mapper::fromOrder)
                .collect(Collectors.toList());
    }
    public OrderResponse findById(Long id) {
        return this.orderRepository.findById(id)
                .map(this.mapper::fromOrder)
                .orElseThrow(() -> new EntityNotFoundException(String.format("No order found with the provided ID: %d", id)));
    }
}
