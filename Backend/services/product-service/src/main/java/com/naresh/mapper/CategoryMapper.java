package com.naresh.mapper;

import com.naresh.Repository.CategoryRepository;
import com.naresh.dto.CategoryRequest;
import com.naresh.dto.CategoryResponse;
import com.naresh.model.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public Category toCategory(CategoryRequest categoryRequest){
        return Category.builder()
                .description(categoryRequest.description())
                .name(categoryRequest.name())
                .build();
    }
    public CategoryResponse fromCategory(Category category){
        return new CategoryResponse(
                category.getId(), category.getName(), category.getDescription()
        );
    }

}
