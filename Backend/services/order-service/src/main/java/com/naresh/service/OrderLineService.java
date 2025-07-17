package com.naresh.service;

import com.naresh.dto.OrderLineRequest;
import com.naresh.dto.OrderLineResponse;
import com.naresh.mapper.OrderLineMapper;
import com.naresh.repository.OrderLineRepository;
import com.naresh.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderLineService {
    private final OrderLineRepository repository;
    private final OrderLineMapper mapper;

    public Long saveOrderLine(OrderLineRequest request){
        var order=mapper.toOrderLine(request);
        return repository.save(order).getId();
    }


}
