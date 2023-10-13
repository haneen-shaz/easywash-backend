import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Card, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { bookUrl, serviceUrl } from '../Constants/Constants';
import axios from '../Utils/Axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { timeSlotUrl } from '../Constants/Constants';


const BookingScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const Params = useParams();
  const [id, setId] = useState(Params.id);
  const [name, setName] = useState('');
  const [bookid,setBookid]=useState('');
  const [price, setPrice] = useState('');
  const [description,setDescription]=useState('')
  const [rating,setRating]=useState('')
  const [showModal, setShowModal] = useState(false);
  const [availableTimeSlots,setAvailableTimeSlots]=useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  

  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  useEffect(() => {
    axios.get(serviceUrl + id).then((response) => {
      setImage(response.data.image);
      setName(response.data.name);
      setDescription(response.data.description)
      setPrice(response.data.price);
      setRating(response.data.rating)
      
    
    });
  }, []);

  // const availableTimeSlots = [
  //   '09:00 AM', '10:00 AM', '11:00 AM',
  //   '01:00 PM', '02:00 PM', '03:00 PM',
  // ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    console.log(date)
    axios.get(timeSlotUrl,{params:{date}})
    .then((response) =>{
      setAvailableTimeSlots(response.data.times)
      console.log(response.data.times)

    })
  };

  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedDate || !selectedTimeSlot) {
      console.log('Please select a date and time slot before submitting.');
      return;
    }

    const bookingData = {
      date: selectedDate.toISOString(),
      timeSlot: selectedTimeSlot,
      user: userInfo.id,
      name: name,
      price: price,
      description:description,
    };

    console.log(bookingData);

    axios
      .post(bookUrl, bookingData)
      .then((response) => {
        console.log('booked');
        console.log(response.data.message);
        console.log(response.data.id);
        setShowModal(true);
        setSelectedDate(null);
        setSelectedTimeSlot(null);
        setBookid(response.data.id)
        
      })
      .catch((error) => {
        console.error('Error saving booking:', error);

      });
  };

  const closeModal = () => {
    setShowModal(false);
    navigate(`/bookingsummary/${bookid}`);
  };

  return (
    <div style={styles.bookingScreen}>
      <div style={styles.bookingContainer}>
        <Card style={styles.imageCard}>
          <Card.Img variant="top" src={image} alt="Booking" style={styles.image} />
          <Card.Body>
            <Card.Title style={styles.cardTitle}>{name}</Card.Title>
            <Card.Text style={styles.cardPrice}>Price: {price}</Card.Text>
            <Card.Text style={styles.cardPrice}>Description:{description}</Card.Text>
            <Card.Text style={styles.cardrating}>Rating:{rating}</Card.Text>
            <Card.Text style={styles.cardRating}>
  Rating: {Array.from({ length: rating }).map((_, index) => (
    <i key={index} className="fas fa-star" style={styles.starIcon}></i>
  ))}
</Card.Text>

          </Card.Body>
        </Card>
      </div>
      <div style={styles.bookingContainer}>
        <h1 style={styles.heading}>Book an Appointment</h1>
        <div style={styles.datePicker}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a date"
            className="custom-datepicker" 
          />
        </div>
        <div style={styles.timeSlots}>
          {selectedDate && (
            <>
              <h3 style={styles.subHeading}>Select a Time Slot:</h3>
              <ul style={styles.timeSlotList}>
                {availableTimeSlots?.map((slot) => (
                  <li
                    key={slot}
                    style={{
                      ...styles.timeSlotItem,
                      ...(selectedTimeSlot === slot ? styles.selectedTimeSlot : {}),
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
            <p style={styles.bookingDetail}>Service: {name}</p>
            <p style={styles.bookingDetail}>Date: {moment(selectedDate).format('MMMM D, YYYY')}</p>
            <p style={styles.bookingDetail}>Time Slot: {selectedTimeSlot}</p>
            <button style={styles.confirmButton} onClick={handleSubmit}>
              Confirm Booking
            </button>
          </div>
        )}
      </div>
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your booking has been confirmed. You will be redirected to the payment page.
        </Modal.Body>
        <Modal.Footer>
          <button style={styles.modalButton} onClick={closeModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const styles = {
  bookingScreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'transparent',
  },
  bookingContainer: {
    flex: '1',
    maxWidth: '500px',
    padding: '20px',
    margin: '20px',
    background: "linear-gradient(to bottom, #F2D228,#E7BB1C )",
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '10px',
  },
  cardPrice: {
    fontSize: '16px',
    color: '#777',
  },
  datePicker: {
    marginBottom: '20px',
  },
  timeSlots: {
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '10px',
  },
  timeSlotList: {
    listStyle: 'none',
    padding: '0',
  },
  timeSlotItem: {
    cursor: 'pointer',
    padding: '8px',
    transition: 'background-color 0.3s ease-in-out',
    borderBottom: '1px solid #eee',
  },
  selectedTimeSlot: {
    backgroundColor: '#EEF228',
    color: '#fff',
  },
  bookingSummary: {
    borderTop: '1px solid #ccc',
    paddingTop: '20px',
    marginTop: '20px',
  },
  bookingDetail: {
    marginBottom: '8px',
  },
  starIcon: {
    color: '#FFD700', // Set the star color
    fontSize: '16px', // Adjust the font size as needed
    marginRight: '5px', // Add spacing between stars if desired
  },
  confirmButton: {
    background: 'linear-gradient(to bottom, #F36414,#E7BB1C )',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '4px',
    textDecoration: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease-in-out',
    cursor: 'pointer',
    display: 'block',
    textAlign: 'center',
    margin: '20px auto 0',
    fontSize: '20px',
    border: 'none',
    borderRadius:'20px'
  },
  imageCard: {
    maxWidth: '100%',
    margin: '0 auto',
  },
  image: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  modalButton: {
    backgroundColor: '#ff9900',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '4px',
    textDecoration: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease-in-out',
    cursor: 'pointer',
    fontSize: '16px',
    border: 'none',
    borderRadius:'20px'
  },
};

export default BookingScreen;
