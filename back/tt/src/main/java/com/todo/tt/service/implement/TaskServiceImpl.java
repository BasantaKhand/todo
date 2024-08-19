package com.todo.tt.service.implement;




import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.todo.tt.model.Todo;
import com.todo.tt.repo.TaskRepo;
import com.todo.tt.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepo taskRepo;
    public Todo saveTask(String userId, Todo task) {
        return this.taskRepo.save(task);   
    }
    public boolean deleteTask(long taskId) {
        try {
         this.taskRepo.deleteById(taskId);
         return true;
        } catch(Exception e) {
            return false;
        }
    }


    @Override
    public Todo updateTask(long taskId, String taskName) {
        try {
            Todo todo = this.taskRepo.getReferenceById(taskId);
            todo.setText(taskName);
            Todo newTask =  taskRepo.save(todo);
             return newTask; 
        } catch(Exception e) {
            return null;
        }
    }

    @Override
    public List<Todo> getTask(String userId) {
        return this.taskRepo.findByUserId(userId);

    }

    @Override
    public boolean completeOnComplateTask(long taskId, boolean is) {
        try {
        Todo todo = taskRepo.getReferenceById(taskId);
        todo.setCompleted(is);
       this.taskRepo.save(todo);
       return true;
        } catch(Exception e) {
            return false;
        }
    }
    
}
