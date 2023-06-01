import React from 'react';
import { Dropdown } from 'react-bootstrap';

interface IProps {
    handleSortChange: (selectedOption: string) => void;
}

const SortTodos: React.FC<IProps> = ({ handleSortChange }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="sortDropdown">
                Sort Todos
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange('completedFirst')}>
                    Completed First
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('notCompletedFirst')}>
                    Not Completed First
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SortTodos;
