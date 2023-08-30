import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify'
import useCreateAuthor from '../../hooks/useCreateAuthor'

const CreateAuthorForm = () => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Author Name</Form.Label>
                <Form.Control type="text" placeholder="Astrid Lindgren" minLength={2} maxLength={15} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="date_of_birth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" />
            </Form.Group>

            <div className='d-flex justify-content-end'>
                <Button variant='success' type="submit">Submit</Button>
            </div>
        </Form>
    )
}

export default CreateAuthorForm
