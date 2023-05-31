import { useState } from 'react';
import AddNewTodoForm from '../components/AddNewTodoForm';
import { Todo } from '../types';
import * as TodosAPI from '../services/TodosAPI';
import { Alert } from 'react-bootstrap';

const CreateTodoPage = () => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleAddTodo = async (newTodo: Todo) => {
        try {
            const createdTodo = await TodosAPI.createTodo(newTodo);
            setAlertVisible(true);
            setAlertMessage('Todo created successfully!');
            console.log('Todo created:', createdTodo);
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    return (
        <>
            {alertVisible && (
                <Alert variant="success" onClose={() => setAlertVisible(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}

            <AddNewTodoForm onAddTodo={handleAddTodo} />
        </>
    );
};

export default CreateTodoPage;
