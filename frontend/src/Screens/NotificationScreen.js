
import React, { useState, useEffect } from 'react';
import axios from '../Utils/Axios';
import { notificationUrl } from '../Constants/Constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const NotificationScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/services/admin/notifications/')
      .then((response) => {
        // Reverse the order of the data array to display the latest notification on top
        setData(response.data.reverse());
        console.log(response);
      });
  }, []);

  const handleDelete = (notificationId) => {
    axios.delete(`/services/admin/delete/${notificationId}`)
      .then(() => {
        console.log('Notification deleted successfully');
        setData(data.filter((notification) => notification.id !== notificationId));
      })
      .catch((error) => {
        console.error('Error deleting notification:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center" style={{ fontSize: '30px' }}>NOTIFICATIONS</h1>

      <div className="list-group mt-4">
        {data?.map((notification) => (
          <div key={notification.id} className="list-group-item list-group-item-action">
            <p>
              <strong> <FontAwesomeIcon icon={faBell} className="notification-icon" /> {notification.Appointment.user.name}</strong> has booked service <strong>{notification.Appointment.service}</strong> at {notification.Appointment.date} on {notification.Appointment.time_slot}
            </p>
            {/* <button
              className="btn btn-danger"
              onClick={() => handleDelete(notification.id)}
            >
              Close
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationScreen;
