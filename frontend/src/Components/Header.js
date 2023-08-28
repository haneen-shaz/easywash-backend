import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import { Logout } from '../actions/userAction'


function Header() {

const userLogin = useSelector(state => state.userLogin)
const { userInfo } = userLogin

const dispatch = useDispatch()
const logoutHandler = () => {
  dispatch(Logout())
}




return (
    <header>
        <Navbar expand="sm" collapseOnSelect style={{ backgroundColor: '#FFC107', color: 'black' }}>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>EASYWASH</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav className="ml-auto">

                        <LinkContainer to='/'>
                            <Nav.Link >SERVICES</Nav.Link>
                        </LinkContainer>

                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Update Profile</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                            </NavDropdown>
                        ) : (
                                <LinkContainer to='/register'>
                                    <Nav.Link><i className="fas fa-user"></i>REGISTER</Nav.Link>
                                </LinkContainer>
                            )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
)
}
 export default Header
