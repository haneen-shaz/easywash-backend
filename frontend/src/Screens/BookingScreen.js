import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Col,ListGroup } from 'react-bootstrap';

const BookingScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const availableTimeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM',
  ];

  const handleDateChange = date => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotClick = slot => {
    setSelectedTimeSlot(slot);
  };

  return (
    <div style={styles.bookingScreen}>
        
        
        
      <h2 style={styles.heading}>Book an Appointment</h2>
      <div style={styles.datePicker}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select a date"
        />
      </div>
      <div style={styles.timeSlots}>
        {selectedDate && (
          <>
            <h3 style={styles.subHeading}>Select a Time Slot:</h3>
            <ul style={styles.list}>
              {availableTimeSlots.map(slot => (
                <li
                  key={slot}
                  style={{
                    ...styles.listItem,
                    ...(selectedTimeSlot === slot ? styles.selectedItem : {}),
                  }}
                  onClick={() => handleTimeSlotClick(slot)}
                >
                  {slot}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {selectedTimeSlot && (
        <div style={styles.bookingSummary}>
          <h3 style={styles.subHeading}>Booking Summary:</h3>
          <p>Date: {moment(selectedDate).format('MMMM D, YYYY')}</p>
          <p>Time Slot: {selectedTimeSlot}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  bookingScreen: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  heading: {
    fontSize: '24px',
    backgroundColor:'orange',
    textalign:'center',
    marginBottom: '20px',
  },
  datePicker: {
    marginBottom: '20px',
    
  },
  timeSlots: {
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '18px',
    backgroundColor:'orange',
    marginBottom: '10px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    cursor: 'pointer',
    padding: '8px',
    transition: 'background-color 0.3s ease-in-out',
  },
  selectedItem: {
    backgroundColor: '#f8e825',
  },
  bookingSummary: {
    borderTop: '1px solid #ccc',
    paddingTop: '20px',
    marginTop: '20px',
  },
};

export default BookingScreen;