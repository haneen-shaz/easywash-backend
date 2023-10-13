import React, { useState } from 'react';
import axios from '../Utils/Axios';
import { useNavigate } from 'react-router-dom';
import {  Modal } from 'react-bootstrap';

const ServiceAddScreen = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    rating: '',
    image: null,
  });
  console.log(formData)

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/admin/servicelist');
  };

  
  const handleSubmit = (e) => {
    setShowModal(true);
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append('name', formData.name);
    formDataWithImage.append('description', formData.description);
    formDataWithImage.append('price', formData.price);
    formDataWithImage.append('rating', formData.rating);
    formDataWithImage.append('image', formData.image);

    axios
      .post('/services/admin/create/', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Service added successfully');
      })
      .catch((error) => {
        console.error('Error adding service:', error);
      });
  };

   const styles={
    modalButton: {
      backgroundColor: '#ff9900',
      color: 'blue',
      padding: '12px 24px',
      borderRadius: '4px',
      textDecoration: 'none',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease-in-out',
      cursor: 'pointer',
      fontSize: '16px',
      border: 'none',
    },
  }

  return (
    <div>
      <h1>Add Service</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3"> {/* Add margin-bottom */}
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control" // Add Bootstrap class for spacing
          />
        </div>
        <div className="form-group mb-3"> {/* Add margin-bottom */}
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-control" // Add Bootstrap class for spacing
          />
        </div>
        <div className="form-group mb-3"> {/* Add margin-bottom */}
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="form-control" // Add Bootstrap class for spacing
          />
        </div>
        <div className="form-group mb-3"> {/* Add margin-bottom */}
          <label>Rating</label>
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            className="form-control" // Add Bootstrap class for spacing
          />
        </div>
        <div className="form-group mb-3"> {/* Add margin-bottom */}
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
            className="form-control-file" // Add Bootstrap class for spacing
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Service is added</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Adding service done successfully.
        </Modal.Body>
        <Modal.Footer>
          <button style={styles.modalButton} onClick={closeModal}>
            OKAY
          </button>
        </Modal.Footer>
      </Modal>
      </form>
    </div>
  );
};

export default ServiceAddScreen;
