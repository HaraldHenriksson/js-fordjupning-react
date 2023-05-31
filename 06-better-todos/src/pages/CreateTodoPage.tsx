import { useEffect, useState } from 'react';
import AddNewTodoForm from '../components/AddNewTodoForm';
import { Todo } from '../types';
import * as TodosAPI from '../services/TodosAPI';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateTodoPage = () => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

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

    useEffect(() => {
        if (alertVisible) {
            const timeout = setTimeout(() => {
                setAlertVisible(false);
                navigate('/todos');
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [alertVisible, navigate]);

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
