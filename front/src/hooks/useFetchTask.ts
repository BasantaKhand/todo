import { useEffect, useState } from "react";
import { todoService } from "../services/todoSevice"; // Correct import path
import { Todo } from "../types/Todo"; // Correct import path

export default function useFetchTask() {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoadingT, setIsLoading] = useState<boolean>(false);
    const [allTodos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        setIsLoading(true);

        if (!userId) {
            setIsLoading(false);
            return;
        }

        (async () => {
            try {
                const todos = await todoService.getTodos(userId);
                setTodos(todos);

            } catch (error) {
                console.error("Error fetching todos:", error);

            } finally {
                setIsLoading(false)
            }
        })();
    }, [userId]); // Ensure userId is in the dependency array

    return { userId, setUserId, allTodos, setTodos, isLoadingT, setIsLoading };
}
