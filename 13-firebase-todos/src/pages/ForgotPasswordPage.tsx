import { Alert, Container, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'

type ForgotPasswordForm = {
    email: string;
}

const ForgotPasswordPage = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<ForgotPasswordForm>()
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { resetPassword } = useAuth()
    const [error, setError] = useState<string | null>(null)

    const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
        // Clear any previous error state
        setError(null)
        try {
            setLoading(true)
            await resetPassword(data.email)

            // If successful, tell the user to check their email
            setSuccessMessage("We've sent you a password reset link to the provided email.")
        } catch (err) {
            if (err instanceof FirebaseError) {
                setError(err.message);  // Set error message upon failure
            } else {
                setError('Unknown Error')
            }
            setLoading(false)
        }
    }

    return (
        <Container className='py-3 center-y'>
            <Row>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                {successMessage && (<Alert variant="success">{successMessage}</Alert>)}
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-3">Forgot Password</Card.Title>

                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        placeholder="example@example.com"
                                        type="email"
                                        {...register('email', {
                                            required: "Please enter an email to reset your password",
                                        })}
                                    />
                                    {errors.email && <p className="invalid">{errors.email.message ?? "Invalid email"}</p>}
                                </Form.Group>

                                <Button disabled={loading} variant="primary" type="submit">{loading
                                    ? "Sending reset link..."
                                    : "Send Reset Link"}</Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <div className="text-center mt-3">
                        Remembered? <Link to="/login">Log In</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ForgotPasswordPage
