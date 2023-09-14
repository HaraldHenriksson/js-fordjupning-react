import { Alert, Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { SignUpCredentials } from '../types/User.types'
import useAuth from '../hooks/useAuth'
import { FirebaseError } from 'firebase/app'

const SignupPage = () => {
    const { handleSubmit, register, watch, formState: { errors } } = useForm<SignUpCredentials>()
    const [loading, setLoading] = useState(false)
    const { signup } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)

    // Watch the current value of `password` form field
    const passwordRef = useRef("")
    passwordRef.current = watch('password')

    const onSignup: SubmitHandler<SignUpCredentials> = async (data) => {
        // Clear any pervious error state
        setError(null)
        try {
            setLoading(true)
            await signup(data.email, data.password);
            navigate('/');  // Redirect to HomePage upon successful signup
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
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-3">Sign Up</Card.Title>

                            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                            <Form onSubmit={handleSubmit(onSignup)}>
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
                                            required: "You're kidding, right? Enter a password, stupid",
                                            minLength: {
                                                value: 3,
                                                message: "Please enter at least 3 characters"
                                            },
                                        })}
                                    />
                                    {errors.password && <p className="invalid">{errors.password.message ?? "Invalid value"}</p>}
                                    <Form.Text>At least 6 characters</Form.Text>
                                </Form.Group>

                                <Form.Group controlId="confirmPassword" className="mb-3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        autoComplete='off'
                                        {...register('passwordConfirm', {
                                            required: "Enter your password again.........",
                                            minLength: {
                                                value: 3,
                                                message: "Please enter at least 3 characters"
                                            },
                                            validate: (value) => {
                                                return value === passwordRef.current || "The passwords does not match 🤦🏼‍♂️"
                                            }
                                        })}
                                    />
                                    {errors.passwordConfirm && <p className="invalid">{errors.passwordConfirm.message ?? "Invalid value"}</p>}
                                </Form.Group>

                                <Button disabled={loading} variant="primary" type="submit">{loading
                                    ? "Creating account..."
                                    : "Create Account"}</Button>
                            </Form>

                        </Card.Body>
                    </Card>

                    <div className="text-center mt-3">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default SignupPage
