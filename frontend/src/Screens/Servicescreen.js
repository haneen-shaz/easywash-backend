import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Rating from '../Components/Rating';
import axios from '../Utils/Axios';
import { serviceUrl } from '../Constants/Constants';
import { Card } from 'react-bootstrap';

const Servicescreen = () => {
  const Params = useParams();
  const [id, setId] = useState(Params.id);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(0);
  const [numreviews, setNumreviews] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(serviceUrl + id).then((response) => {
      setName(response.data.name);
      setImage(response.data.image);
      setRating(response.data.rating);
      setNumreviews(response.data.numreviews);
      setDescription(response.data.description);
      setPrice(response.data.price);
    });
  }, []);

  return (
    
    <div>
      
      <Row style={{ padding: '20px',alignItems: 'center' }}>
        <Col md={6}>
        
        
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={image} alt={name} style={{height:"306px",width:"320px", borderRadius: '45px' }} />
          </div>
         
          <Link
            to={`/booking/${id}`}
            style={{
              display: 'block',
              background: 'linear-gradient(to bottom, #F36414,#E7BB1C )',
              color: '#333',
              position:'absolute',
              padding: '12px 20px',
              height:'47px',
              width:'251px',
              marginTop: '10px',
              textAlign: 'center',
              border: 'none',
              borderRadius: '25px',
              fontSize: '18px',
              marginLeft: '125px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease-in-out',  
            }}
          >
            Book Now
          </Link>
        </Col>
        <Col md={5}>
          <Card.Body style={{background: "linear-gradient(to bottom, #F2D228,#E7BB1C )",height:"306px",width:"320px",borderRadius:"45px", marginLeft: '-103px', marginTop: '-1px'}}>
          <h1 style={{ textAlign:'center',fontSize: '28px', marginTop: '10px', marginBottom: '20px', color: '#333' }}>{name}</h1>
          <Rating value={rating} text={`${numreviews} reviews`} color={'#f8e825'} />
          <h3 style={{ fontSize: '18px', marginTop: '20px', color: '#333' }}>Price: Rs.{price}</h3>
          <p style={{fontSize: '18px', marginTop: '20px', color: '#555' }}> Description: {description}</p>
          </Card.Body> 
        </Col>
      </Row>
    </div>
  );
};

export default Servicescreen;
