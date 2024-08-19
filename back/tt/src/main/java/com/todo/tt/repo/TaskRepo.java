package com.todo.tt.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Repository;

import com.todo.tt.model.Todo;
import java.util.List;




@Repository
public interface TaskRepo extends JpaRepository<Todo, Long> {
    public List<Todo> findByUserId(String userId);
}
