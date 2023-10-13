import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { Card, Modal } from 'react-bootstrap';
import axios from '../Utils/Axios';
import { summaryUrl } from '../Constants/Constants';
import { useNavigate } from 'react-router-dom';

const BookingSummaryScreen = () => {
  console.log('Rendering BookingSummaryScreen');
  const Params = useParams();
  const [id, setId] = useState(Params.id);
  const [service, setService] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const styles = {
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
    },
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/');
  };

  const handleSuccess = (details, data) => {
    console.log('Payment success:', details);
    console.log('Payment data:', data);
    setShowModal(true);
  };

  const handleCancel = (data) => {
    console.log('Payment canceled:', data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(summaryUrl + id);
      setService(response.data.service);
      setTime(response.data.time_slot);
      setDate(response.data.date);
      setPrice(response.data.payment);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=A8EVIPRg8VXjPpn1ZsojuaA0vqAFAUByDSVMjgwNO68WrPW96QG1Qawt';
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '30px' }}>BOOKING SUMMARY</h1>

      <Card.Body style={{ background: 'linear-gradient(to bottom, #F2D228,#E7BB1C )', height: '180px', width: '320px', borderRadius: '45px', marginLeft: '5px', marginTop: '-1px' }}>
        <p style={{ textAlign: 'center' }}>
          <strong> Service Name: </strong> {service}
        </p>
        <p style={{ textAlign: 'center' }}>
          <strong>Price: Rs.</strong>
          {price}
        </p>
        <p style={{ textAlign: 'center' }}>
          <strong>Date:</strong> {date}
        </p>
        <p style={{ textAlign: 'center' }}>
          <strong>Time:</strong>
          {time}
        </p>
      </Card.Body>

      <h2 style={{ fontSize: '20px' }}>PAYMENT</h2>
      <p>Payment method: PayPal</p>

      
        <div style={{ fontSize: '14px', padding: '5px', width: '2px' }}>
          <PayPalButton amount={price} currency="USD" onSuccess={handleSuccess} onCancel={handleCancel} />
        </div>
    

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your payment is successful.</Modal.Body>
        <Modal.Footer>
          <button style={styles.modalButton} onClick={closeModal}>
            OKAY
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingSummaryScreen;
