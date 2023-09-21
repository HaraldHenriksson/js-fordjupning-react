import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dummyTodos } from "../../data/todos";
import { Todo, TodoFormData } from "../../types/Todo.types";

const todosSlice = createSlice({
    name: "todos",
    initialState: dummyTodos,
    reducers: {
        handleAddTodo: (state, action: PayloadAction<TodoFormData>) => {
            const newTodo = {
                id: Date.now().toString(),
                title: action.payload.title,
                completed: false,
            };
            state.push(newTodo);
        },
        handleToggle: (state, action: PayloadAction<string>) => {
            const todo = state.find(t => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        handleDelete: (state, action: PayloadAction<string>) => {
            const index = state.findIndex(t => t.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    }
})

// Action creators are generated for each reducer function
export const { handleAddTodo, handleToggle, handleDelete } = todosSlice.actions

// Export the reducer
export default todosSlice.reducer