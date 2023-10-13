// import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AdminLogout } from '../actions/userAction';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center; /* Fix the typo in 'text-align' property */
`;

const DashboardSection = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px 0;
  text-align: left;

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;
    }

    .notification {
      background-color: red;
      color: white;
      border-radius: 50%;
      padding: 2px 2px;
      font-size: 12px;
      margin-right: 10px;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 10px;
      background-color: orange;
      color: #fff;
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
      transition: background-color 0.2s;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

const LogoutButton = styled.button`
  background-color: orange;
  color: white;
  font-weight: bold;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const AdminHomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const aLogout = useSelector(state => state.adminLogin);
  const { userInfo } = aLogout;

  const logoutHandler = () => {
    console.log('Logging out...');
    dispatch(AdminLogout());
    console.log('Logout action dispatched.');
    navigate('/adminlogin/');
  };

  return (
    <Container>
      <Title>Welcome, Admin!</Title>
      <DashboardSection>
        <h2>ADMIN DASHBOARD</h2>
        <ul>
          <li>
            <Link to="/adminhome/notifications">
              Notifications
              <FontAwesomeIcon icon={faBell} className="notification-icon" />
            </Link>
          </li>
          <li>
            <Link to="/admin/userslist">Manage Users</Link>
          </li>
          <li>
            <Link to="/admin/servicelist">Manage Services</Link>
          </li>
          <li>
            <Link to="/admin/bookinglist">Manage Bookings</Link>
          </li>
        </ul>

        <LogoutButton onClick={logoutHandler}>Logout</LogoutButton>
      </DashboardSection>
    </Container>
  );
};

export default AdminHomeScreen;
