import React, { useState } from 'react';
import axios from '../Utils/Axios';

const ServiceupdateScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    rating: '',
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append('name', formData.name);
    formDataWithImage.append('description', formData.description);
    formDataWithImage.append('price', formData.price);
    formDataWithImage.append('rating', formData.rating);
    formDataWithImage.append('image', formData.image);

    axios
      .post('/services/admin/updateservice/', formDataWithImage, {
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

  return (
    <div>
      <h1>Update Service</h1>
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
      </form>
    </div>
  );
};

export default ServiceupdateScreen;
