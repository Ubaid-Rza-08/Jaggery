package com.naresh.mapper;

import com.naresh.dto.OrderRequest;
import com.naresh.dto.OrderResponse;
import com.naresh.dto.PurchaseRequest;
import com.naresh.model.Order;
import com.naresh.model.OrderLine;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class OrderMapper {
    public Order toOrder(OrderRequest orderRequest){

        List<OrderLine> orderLineList=new ArrayList<>();
        for(PurchaseRequest purchaseRequest:orderRequest.products()){
             OrderLine orderLine=new OrderLine();
             orderLine.setProductId(purchaseRequest.productId());
             orderLine.setQuantity(purchaseRequest.quantity());
             orderLineList.add(orderLine);
        }
        if(orderRequest==null)return null;
        return Order.builder()
                .totalAmount(orderRequest.totalAmount())
                .orderLines(orderLineList).
                build();
    }
    public OrderResponse fromOrder(Order order){
        return new OrderResponse(order.getId(),
                order.getTotalAmount());

    }
}
