package com.todo.tt.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.todo.tt.model.Todo;


public interface TaskService {
       public Todo saveTask(String userId, Todo task);
    public boolean deleteTask(long taskId);
    public Todo updateTask(long taskId, String text);
    public List<Todo> getTask(String userId);
    public boolean completeOnComplateTask(long id , boolean is);
}
