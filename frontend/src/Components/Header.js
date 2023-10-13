import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox';
import { Logout } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const logoutHandler = () => {
    dispatch(Logout());
    navigate('/login');
  };

  return (
    <header>
      <Navbar expand="sm" collapseOnSelect style={{ backgroundColor: '#FFC107', color: 'black' }}>
        <Container>
          <LinkContainer to="/" style={{ background: 'linear-gradient(to bottom, #F36414, #E7BB1C)' }}>
            <Navbar.Brand>EASYWASH</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox  />
        
            <Nav className="ml-auto align-items-center">
              <LinkContainer to="/" style={{ marginLeft:'300px' }}>
                <Nav.Link>SERVICES</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/previousbookings">
                    <NavDropdown.Item>Bookings</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/noti">
                    <NavDropdown.Item>Notification</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/register">
                  <Nav.Link>
                    <i className="fas fa-user"></i>REGISTER
                  </Nav.Link>
                </LinkContainer>
              )}

             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
