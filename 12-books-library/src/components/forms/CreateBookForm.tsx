import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useForm, SubmitHandler } from 'react-hook-form'
import useCreateBookForm from '../../hooks/useCreateBookForm'
import { NewBook } from '../../types/BooksAPI.types'

const CreateBookForm = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<NewBook>()
    const createBookMutation = useCreateBookForm()

    const onCreateBookSubmit: SubmitHandler<NewBook> = (data) => {
        console.log("submitted data:", data)

        createBookMutation.mutate(data)
    }
    return (
        <Form onSubmit={handleSubmit(onCreateBookSubmit)}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Title"
                    {...register('title', {
                        required: true,
                        minLength: 3,
                    })}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="date_of_birth">
                <Form.Label>Pages</Form.Label>
                <Form.Control
                    type="number"
                    {...register('pages', {
                        required: true,
                    })}
                />

            </Form.Group>

            <Form.Group className="mb-3" controlId="date_of_birth">
                <Form.Label>Published</Form.Label>
                <Form.Control
                    type="date"
                    {...register('published', {
                        required: true,
                    })}
                />

            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button
                    variant="success"
                    type="submit"
                >Create</Button>
            </div>
        </Form>
    )
}

export default CreateBookForm