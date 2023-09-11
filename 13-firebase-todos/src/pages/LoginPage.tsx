import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { LoginCredentials } from '../types/User.types'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'

const LoginPage = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<LoginCredentials>()
    const { login } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)

    const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
        try {
            await login(data.email, data.password);
            navigate('/')
        } catch (error) {
            setError("Failed to sign up.")
        }
    }

    return (
        <Row>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            <Col md={{ span: 6, offset: 3 }}>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-3">Login</Card.Title>

                        <Form onSubmit={handleSubmit(onLogin)}>
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    placeholder="example@example.com"
                                    type="email"
                                    {...register('email', {
                                        required: "You have to enter an email",
                                    })}
                                />
                                {errors.email && <p className="invalid">{errors.email.message ?? "Invalid value"}</p>}
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    autoComplete="new-password"
                                    {...register('password', {
                                        required: "You're kidding, right? Enter your password, stupid",
                                        minLength: {
                                            value: 3,
                                            message: "Please enter at least 3 characters"
                                        },
                                    })}
                                />
                                {errors.password && <p className="invalid">{errors.password.message ?? "Invalid value"}</p>}
                                <Form.Text>At least 6 characters</Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="submit">Log In</Button>
                        </Form>

                        <div className="text-center">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </Card.Body>
                </Card>

                <div className="text-center mt-3">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </Col>
        </Row>
    )
}

export default LoginPage
