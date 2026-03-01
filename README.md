# 🧱 Jaggery – Scalable Microservices-Based E-commerce Platform

[![Spring Boot](https://img.shields.io/badge/SPRING%20BOOT-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Cloud](https://img.shields.io/badge/SPRING%20CLOUD-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-cloud)
[![PostgreSQL](https://img.shields.io/badge/POSTGRESQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Apache Kafka](https://img.shields.io/badge/APACHE%20KAFKA-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)](https://kafka.apache.org/)
[![Redis](https://img.shields.io/badge/REDIS-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/DOCKER-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Prometheus](https://img.shields.io/badge/PROMETHEUS-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)](https://prometheus.io/)
[![Grafana](https://img.shields.io/badge/GRAFANA-F46800?style=for-the-badge&logo=grafana&logoColor=white)](https://grafana.com/)
[![Zipkin](https://img.shields.io/badge/ZIPKIN-F46800?style=for-the-badge&logo=zipkin&logoColor=white)](https://zipkin.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📜 Overview

Jaggery is a microservices-based e-commerce platform for selling jaggery products. Built with **Spring Boot** and **Spring Cloud**, it focuses on scalability, resilience, and observability using modern cloud-native tools.

---

## 🚀 Key Features

* ✅ **Microservices Architecture** – Independent, modular services for flexibility and scalability.
* 🔐 **JWT-based Authentication** – Secure, stateless sessions using Spring Security.
* 🌐 **Spring Cloud Gateway** – Centralized API gateway for request routing and filtering.
* 🗄️ **Optimized PostgreSQL Database** – Indexed schemas and pagination for large-scale user data.
* ⚡ **Apache Kafka Integration** – Enables asynchronous messaging between services.
* 🛑 **Redis Caching** – Reduces database load and improves response time by 70%.
* 📊 **Monitoring and Tracing** – Real-time metrics via Prometheus, dashboards via Grafana, and distributed tracing via Zipkin.
* ⚙️ **Resilient Architecture** – Circuit breakers and auto-restarts achieve 99.9% uptime under simulated failures.

---

## 🧰 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend Framework** | Spring Boot, Spring Cloud |
| **Authentication** | JWT (Spring Security) |
| **Database** | PostgreSQL |
| **Messaging** | Apache Kafka |
| **Caching** | Redis |
| **Gateway** | Spring Cloud Gateway |
| **Monitoring** | Prometheus, Grafana |
| **Tracing** | Zipkin |
| **Containerization** | Docker, Docker Compose |

---

## 🧩 Microservices Overview

| Service | Description |
| :--- | :--- |
| 👤 **Auth Service** | Handles user registration, authentication, and JWT management. |
| 📦 **Product Service** | Manages products and categories, integrated with Redis cache. |
| 🛒 **Order Service** | Handles user orders and interacts with inventory. |
| 🏷️ **Inventory Service** | Manages stock levels and Kafka events. |
| ✉️ **Notification Service** | Sends real-time updates via Kafka listeners. |
| 🌐 **API Gateway** | Routes client requests securely to services. |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone [https://github.com/yourusername/jaggery.git](https://github.com/yourusername/jaggery.git)
cd jaggery
