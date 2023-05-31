import React from 'react';
import AddNewTodoForm from '../components/AddNewTodoForm';
import { Todo } from '../types';
import * as TodosAPI from '../services/TodosAPI'

const CreateTodoPage = () => {
    const handleAddTodo = async (newTodo: Todo) => {
        try {
            const createdTodo = await TodosAPI.createTodo(newTodo)
            console.log('todo created', createdTodo)
        } catch (err) {
            console.log('Error creating todo', err)
        }
    };

    return (
        <AddNewTodoForm onAddTodo={handleAddTodo} />
    );
};

export default CreateTodoPage;