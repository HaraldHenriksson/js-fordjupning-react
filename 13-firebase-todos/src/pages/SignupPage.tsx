import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { SignupCredentials } from '../types/User.types'

const SignupPage = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<SignupCredentials>()

    const onSignup: SubmitHandler<SignupCredentials> = async (data) => {
        console.log('whould singup user', data)
    }

    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-3">Sign Up</Card.Title>

                        <Form onSubmit={handleSubmit(onSignup)}>
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    placeholder="example@example.com"
                                    type="email"
                                    {...register('email', {
                                        required: "You have to enter an email"
                                    })}
                                />
                            </Form.Group>

                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    {...register('password', {
                                        required: "You have to enter password",
                                        minLength: 3,
                                    })}
                                />
                                <Form.Text>At least 6 characters</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="confirmPassword" className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    {...register('passwordConfirm', {
                                        required: "You have to confirm password.....",
                                        minLength: 3,
                                    })}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">Create Account</Button>
                        </Form>

                        <div className="text-center">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </Card.Body>
                </Card>

                <div className="text-center mt-3">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </Col>
        </Row>
    )
}

export default SignupPage
