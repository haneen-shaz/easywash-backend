
// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendar } from '@fortawesome/free-solid-svg-icons';
// import axios from '../Utils/Axios';
// import { useSelector } from 'react-redux';
// import './PreviousBookingScreen.css'; // Import your CSS file for styling

// const PreviousBookingScreen = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const bookingData = {
//     user: userInfo.id,
//   };
//   console.log(userInfo.id);

//   useEffect(() => {
//     axios
//       .get(`/services/bookings/${userInfo.id}`)
//       .then((response) => {
//         setBookings(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching booking history:', error);
//       });
//   }, []);


//   useEffect(() => {
//     axios
//       .get(`/services/bookings/${userInfo.id}`)
//       .then((response) => {
//         setBookings(response.data);
//         console.log(response.data);

//         // Convert the received data to notifications
//         const bookingNotifications = response.data.map((booking) => ({
//           id: booking.id,
//           content: (
//             <div key={booking.id} className="notification-content">
//               <strong>{booking.service}</strong> is booked Rs. {booking.payment} on {booking.date}at {booking.time_slot}
//             </div>
//           ),
//         }));

//         // Display notifications
//         setNotifications(bookingNotifications);
//       })
//       .catch((error) => {
//         console.error('Error fetching booking history:', error);
//       });
//   }, []);

//   const handleCloseNotification = (id) => {
//     // Close the notification by removing it from the state
//     setNotifications((prevNotifications) =>
//       prevNotifications.filter((notification) => notification.id !== id)
//     );
//   };

//   return (
//     <div className="booking-container">
//       <h1 style={{ fontSize: '30px', textAlign: 'center' }}>YOUR BOOKINGS</h1>

//       {notifications.map((notification) => (
//         <div key={notification.id} className={`booking-notification slide-out`}>
//           {notification.content}
//           {/* <button
//             className="close-btn"
//             onClick={() => handleCloseNotification(notification.id)}
//           >
//             Close
//           </button> */}
//         </div>
//       ))}


//     </div>
//   );
// };

// export default PreviousBookingScreen;


import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from '../Utils/Axios';
import { useSelector } from 'react-redux';
import './PreviousBookingScreen.css'; // Import your CSS file for styling

const PreviousBookingScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    axios
      .get(`/services/bookings/${userInfo.id}`)
      .then((response) => {
        // Reverse the order of bookings to display the latest at the top
        const reversedBookings = response.data.reverse();

        // Convert the received data to notifications
        const bookingNotifications = reversedBookings.map((booking) => ({
          id: booking.id,
          content: (
            <div key={booking.id} className="notification-content">
              <strong>{booking.service}</strong> is booked Rs. {booking.payment} on {booking.date} at {booking.time_slot}
            </div>
          ),
        }));

        // Display notifications
        setNotifications(bookingNotifications);
      })
      .catch((error) => {
        console.error('Error fetching booking history:', error);
      });
  }, [userInfo.id]);

  const handleCloseNotification = (id) => {
    // Close the notification by removing it from the state
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="booking-container">
      <h1 style={{ fontSize: '30px', textAlign: 'center' }}>YOUR BOOKINGS</h1>

      {notifications.map((notification) => (
        <div key={notification.id} className={`booking-notification slide-out`}>
          {notification.content}
          {/* <button
            className="close-btn"
            onClick={() => handleCloseNotification(notification.id)}
          >
            Close
          </button> */}
        </div>
      ))}
    </div>
  );
};

export default PreviousBookingScreen;


