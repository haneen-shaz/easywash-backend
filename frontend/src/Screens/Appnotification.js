
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from '../Utils/Axios';
import { useSelector } from 'react-redux';
import './PreviousBookingScreen.css'; // Import your CSS file for styling

const Appnotification = () => {
  const [bookings, setBookings] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bookingData = {
    user: userInfo.id,
  };
  console.log(userInfo.id);

  useEffect(() => {
    axios
      .get(`/services/bookings/${userInfo.id}`)
      .then((response) => {
        setBookings(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching booking history:', error);
      });
  }, []);

  return (
    <div className="booking-container">
      <h1 style={{ fontSize: '30px', textAlign: 'center' }}>YOUR BOOKINGS</h1>
      
      <table className="booking-table">
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Price (Rs.)</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.service}</td>
              <td>{booking.payment}</td>
              <td>{booking.date}</td>
              <td>{booking.time_slot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appnotification;
