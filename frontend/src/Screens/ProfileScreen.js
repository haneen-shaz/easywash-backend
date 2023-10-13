import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { getUserDetails } from '../actions/userAction'
import { useNavigate } from 'react-router-dom'
import axios from '../Utils/Axios';




function ProfileScreen({history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const navigate=useNavigate()
    

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
      if (userInfo){
        
        navigate('/profile')
      }
      else{
        if (!user || !user.name){
            dispatch(getUserDetails('profile'))
        }else{
            setName(user.name)
            setEmail(user.email)
        }
      }
    }, [dispatch,history,userInfo]);

    // const submitHandler = (e) => {
    //     e.preventDefault()

    //     if (password != confirmPassword) {
    //         setMessage('Passwords do not match')
    //     } else {
    //         console.log('updating')
    //     }

    // }
    // console.log("updated")
    const submitHandler = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
    
                const { data } = await axios.put('api/users/profile/update/', { name, email, password }, config);
    
                setMessage(data.message);
            } catch (error) {
                setMessage('An error occurred while updating the profile');
            }
        }
    };
    


    return (
        <Row>
            <Col style={{alignContent:'center'}} md={3}>
                <h2>USER PROFILE</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
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

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button style={{ padding: '10px 20px', marginTop: '10px' }} type='submit' variant='primary'>
                        Update
                </Button>
              
                </Form>
            </Col>

            
            
        </Row>
    )
}

export default ProfileScreen
