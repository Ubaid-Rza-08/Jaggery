//package com.naresh.util;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cloud.gateway.filter.GatewayFilterChain;
//import org.springframework.cloud.gateway.filter.GlobalFilter;
//import org.springframework.core.Ordered;
//import org.springframework.core.annotation.Order;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Component;
//import org.springframework.web.server.ServerWebExchange;
//import reactor.core.publisher.Mono;
//
//import java.util.List;
//import java.util.Map;
//@Component
//@Order(1)
//public class JwtFilter implements GlobalFilter{
//    @Autowired
//    private JwtUtil jwtUtil;
//    private static final List<String>WHITELIST=List.of(
//            "/api/v1/auth/token",
//            "/api/v1/auth/register",
//            "/api/v1/product/getCategory",
//            "/api/v1/product/category",
//            "/api/v1/product/getAllProducts"
//    );
//    private static final Logger log = LoggerFactory.getLogger(JwtFilter.class);
//    @Override
//    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
//        log.info("Global filter executed");
//        String path=exchange.getRequest().getURI().getPath();
//        if(WHITELIST.stream().anyMatch(path::startsWith)){
//            return chain.filter(exchange);
//        }
//        String authHeader=exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
//        if(authHeader==null || !authHeader.startsWith("Bearer ")){
//            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
//            return exchange.getResponse().setComplete();
//        }
//        String token=authHeader.substring(7);
//        Map<String,Object> claims;
//        try{
//            jwtUtil.validateToken(token);
//        }catch (Exception e){
//            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
//            return exchange.getResponse().setComplete();
//        }
//        return chain.filter(exchange);
//    }
//}
