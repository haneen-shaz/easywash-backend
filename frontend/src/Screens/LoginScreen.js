import React ,{useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Form ,Button,Row,Col} from 'react-bootstrap'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userAction'
import FormContainer from '../Components/FormContainer'


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
   
    const navigate=useNavigate()


    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    
    
    
    
    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [ userInfo])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

  return (
    <FormContainer>
       <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'  style={{ padding: '10px 20px', marginTop: '10px' }} >
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Client? <Link
                        to='/register'>
                        Register
                        </Link>
                </Col>
            </Row>
    </FormContainer>
  )
}

export default LoginScreen
