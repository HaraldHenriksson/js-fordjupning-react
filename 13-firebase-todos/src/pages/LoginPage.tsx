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
import { FirebaseError } from 'firebase/app'
import { Container } from 'react-bootstrap'

const LoginPage = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<LoginCredentials>()
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)

    const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
        try {
            setLoading(true)
            await login(data.email, data.password);
            navigate('/')
        } catch (error) {
            if (error instanceof FirebaseError) {
                setError(error.message)
            } else {
                setError('Unknown Error')
            }
        }
        setLoading(false)
    }

    return (
        <Container className='py-3'>
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
                                        autoComplete='email'
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

                                <Button
                                    disabled={loading}
                                    variant="primary"
                                    type="submit"
                                >
                                    {loading
                                        ? "Logging in..."
                                        : "Log In"}
                                </Button>
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
        </Container>
    )
}

export default LoginPage
