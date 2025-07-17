package com.naresh.Repository;

import com.naresh.dto.ProductResponse;
import com.naresh.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findAllByIdInOrderById(List<Long> ids);
    @Query("SELECT p FROM Product p WHERE p.category.id=:id ")
    List<ProductResponse> findAllByCategoryId(Long id);
}
