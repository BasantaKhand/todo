// src/test/java/com/todo/tt/TaskServiceTests.java

package com.todo.tt;



import static org.assertj.core.api.Assertions.assertThat;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import com.todo.tt.model.Todo;
import com.todo.tt.service.TaskService;
import com.todo.tt.service.implement.TaskServiceImpl;


public class TaskServiceTests {

    private TaskService taskService;
    private Todo testTodo;

    @BeforeEach
    void setUp() {
        taskService = new TaskServiceImpl(); // Initialize the service directly
        testTodo = new Todo();
        testTodo.setUserId("user1");
        testTodo.setText("Test Task");
        
    }

    @Test
    void testSaveTask() {
        Todo savedTodo = taskService.saveTask("user123", testTodo);
        assertThat(savedTodo).isNotNull();
        assertThat(savedTodo.getUserId()).isEqualTo("user123");
        assertThat(savedTodo.getText()).isEqualTo("Test Task");
        // Verify that the ID is set correctly
        assertThat(savedTodo.getId()).isGreaterThan(0);
    }

    @Test
    void testDeleteTask() {
        Todo savedTodo = taskService.saveTask("user123", testTodo); // Save the task first
        long taskId = savedTodo.getId(); // Use the dynamically assigned ID
        boolean isDeleted = taskService.deleteTask(taskId);
        assertThat(isDeleted).isTrue();
        // Verify that the task is no longer in the list
        List<Todo> tasks = taskService.getTask("user123");
        assertThat(tasks).isEmpty();
    }

    @Test
    void testUpdateTask() {
        Todo savedTodo = taskService.saveTask("user123", testTodo); // Save the task first
        long taskId = savedTodo.getId(); // Use the dynamically assigned ID
        Todo updatedTodo = taskService.updateTask(taskId, "Updated Task Text");
        assertThat(updatedTodo).isNotNull();
        assertThat(updatedTodo.getText()).isEqualTo("Updated Task Text");
    }

    @Test
    void testGetTask() {
        taskService.saveTask("user123", testTodo); // Save the task first
        List<Todo> tasks = taskService.getTask("user123");
        assertThat(tasks).isNotEmpty();
        assertThat(tasks.get(0).getUserId()).isEqualTo("user123");
        assertThat(tasks.get(0).getText()).isEqualTo("Test Task");
    }

    @Test
    void testCompleteTask() {
        Todo savedTodo = taskService.saveTask("user123", testTodo); // Save the task first
        long taskId = savedTodo.getId(); // Use the dynamically assigned ID
        boolean isCompleted = taskService.completeOnComplateTask(taskId, true);
        assertThat(isCompleted).isTrue();
        assertThat(taskService.getTask("user123").get(0).isCompleted()).isTrue();
    }
}
