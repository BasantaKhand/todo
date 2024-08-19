package com.todo.tt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.todo.tt.dto.ErrorResponse;
import com.todo.tt.dto.SuccessReponse;
import com.todo.tt.model.Todo;
import com.todo.tt.repo.TaskRepo;
import com.todo.tt.service.TaskService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class TodoController {

    @Autowired
    private TaskService taskService;
      @PostMapping("/create-todo/{userId}")
    public Object createTodo(@PathVariable String userId, @RequestBody Todo todo) {
      try {
      System.out.println(userId);
      System.out.println(todo.getText());
        Todo savedTodo = taskService.saveTask(userId, todo);
        System.out.println(savedTodo + "saved");
        return new SuccessReponse<>("task created", 200, savedTodo, "success");
      }  catch(Exception e) {
        System.out.println(e.getMessage() + " this is teh error");
        return new ErrorResponse(e.getMessage().toString(), 403, "error");
      }
      
    }


    @GetMapping("/get-todos/{userId}")
    public Object getTodos(@PathVariable String userId) {
      try {
        List<Todo> savedTodo = taskService.getTask(userId);
        return new SuccessReponse<>("task created", 200, savedTodo, "success");
      }  catch(Exception e) {
        System.out.println(e.getMessage() + " this is teh error");
        return new ErrorResponse(e.getMessage().toString(), 403, "error");
      }
      
    }


    @DeleteMapping("/delete-todo/{id}")
    public Object deleteTodo(@PathVariable long id) {
      try {
        taskService.deleteTask(id);
        return new SuccessReponse<>("task deleted", 200, null, "success");
      } catch (Exception e) {
        return new ErrorResponse(e.getMessage().toString(), 403, "error");
      }
    }

    /**
     * RequestWrapperForUpdate
     */
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    static public class RequestWrapperForUpdate {
      private String text;
    }
    @PutMapping("/update-textname/{id}")
    public Object updateTodo(@PathVariable long id, @RequestBody RequestWrapperForUpdate requestWrapperForUpdate) {
      try {
        if (requestWrapperForUpdate.text.isEmpty()) {
          return new ErrorResponse("newTextname required", 403, "error");
        }
        Todo todo = taskService.updateTask(id, requestWrapperForUpdate.text);
        return new SuccessReponse<>("task deleted", 200, todo, "success");
      } catch (Exception e) {
        return new ErrorResponse(e.getMessage().toString(), 403, "error");
      }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    static public class RequestWrapperForComplete {
      private boolean completed;
    }
    @PutMapping("/make-completeor-uncomplete/{id}")
    public Object completedNotComplete(@PathVariable long id, @RequestBody RequestWrapperForComplete requestWrapperForComplete) {
      try {
        taskService.completeOnComplateTask(id, requestWrapperForComplete.completed);
        return new SuccessReponse<>("Successfully", 200, null, "success");
      } catch (Exception e) {
        return new ErrorResponse(e.getMessage().toString(), 403, "error");
      }
    }





}