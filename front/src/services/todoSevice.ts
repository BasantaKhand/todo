import axios from "axios";
import {Todo} from "../types/Todo.ts";


class TodoSevice {
    public async createTodo(userId: string | undefined, todo: Todo): Promise<Todo> {
        try {
            const response = await axios.post(`http://localhost:8001/create-todo/${userId}`, {...todo});
            const data = await response.data;
            if (data.status !==  200) {
                throw new Error(data.error)
            }
            return data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error("New Error");
            } else {
                throw error;
            }
        }
    }
    public async getTodos(id:string):Promise<Todo[]|undefined> {
        try {
            const response = await axios.get(`http://localhost:8001/get-todos/${id}`);
            const data = await response.data;
            if (data.status !==  200) {
                throw new Error(data.error);
            }
            return data.data;
        } catch (error) {

        }
    }
    public async updateTask(id: number, newTaskText: string): Promise<Todo> {
        try {
            const response = await axios.put(`http://localhost:8001/update-textname/${id}`, {text: newTaskText});
            const data = await response.data;
            return data.data;
        }   catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error("New Error");
            } else {
                throw error;
            }
        }
    }
    public async deleteTodo(id: number) {
        try {
            const response = await axios.delete(`http://localhost:8001/delete-todo/${id}`)
            const data = await response.data;
            if (data.status !==  200) {
                throw new Error(data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error("New Error");
            } else {
                throw error;
            }
        }
    }
    public async completedNotComplete(id:number , completed: boolean) {
        try {
            const response = await axios.put(`http://localhost:8001/make-completeor-uncomplete/${id}`, {completed});
            const data = await response.data;
            if (data.status !==  200) {
                throw new Error(data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error("New Error");
            } else {
                throw error;
            }
        }
    }
 }


 const todoService = new TodoSevice()
export {todoService}