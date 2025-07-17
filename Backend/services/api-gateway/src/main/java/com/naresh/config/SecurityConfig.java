//package com.naresh.config;
//
////import org.springframework.context.annotation.Bean;
////import org.springframework.security.config.web.server.ServerHttpSecurity;
////import org.springframework.security.web.server.SecurityWebFilterChain;
//
//public class SecurityConfig {
//    @Bean
//    public SecurityWebFilterChain  springSecurityFilterChain(ServerHttpSecurity http){
//         http
//                .csrf(ServerHttpSecurity.CsrfSpec::disable)
//                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
//                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
//                .authorizeExchange(exchange -> exchange
//                        .pathMatchers("/api/v1/auth/register", "/api/v1/auth/token", "/api/v1/auth/validate").permitAll()
//                        .anyExchange().authenticated()
//                ).oauth2ResourceServer(ServerHttpSecurity.OAuth2ResourceServerSpec::jwt);
//               return http.build();
//    }
//
//}
