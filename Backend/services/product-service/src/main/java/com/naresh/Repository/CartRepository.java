package com.naresh.Repository;

import com.naresh.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CartRepository extends JpaRepository<CartItem,Long> {
Optional< CartItem>  findByUserId(UUID userId);
}
