import React,{useState,useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col,Image, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../Components/Rating';
import Services from '../Services';
import axios from '../Utils/Axios'
import { listServicesDetails} from '../actions/serviceAction';


const Servicescreen = () => {
  
  
  // const service = Services.find((s) => s._id === id);
  const dispatch = useDispatch();
  const serviceDetails = useSelector(state => state.serviceDetails);
  const service= serviceDetails
  const Params=useParams()
  const [id,setId]=useState(Params.id)

  // useEffect(() => {
  //   dispatch(listServicesDetails(id));
  // }, [dispatch,id]);
  
  
  useEffect(() => {
    
    axios.get(`services/${id}`)
      .then(response => {
        dispatch(listServicesDetails(response.data));
      })
      .catch(error => {
        console.error('Error fetching service details:', error);
      });
  }, [dispatch, id]);
  
  const headingStyle = {
    fontSize: '24px',
    marginBottom: '10px',
  };

  const backButtonStyle = {
    textDecoration: 'none',
    backgroundColor: '#f8f9fa',
    color: '#333',
    padding: '10px 20px',
    borderRadius: '4px',
    marginBottom: '20px',
    display: 'inline-block',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };
  const bookNowStyle = {
    display: 'inline-block',
    backgroundColor: '#f8e825',
    color: '#333',
    padding: '10px 10px', // Adjust the left and right padding to reduce the length
    borderRadius: '4px',
    textDecoration: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease-in-out',
  };
  
 

  return (
   
    <div className="service-details">
      <Link to="/" style={backButtonStyle}>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <img src = {service.image} alt={service.name} />
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <h3 style={headingStyle}>{service.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating value={service.rating} text={`${service.numreviews} reviews`} color={'#f8e825'} />
            </ListGroup.Item>

            <ListGroup.Item>
              Price: Rs.{service.price}
            </ListGroup.Item>

            <ListGroup.Item>
              Description: {service.Description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        
        

        
      </Row>
      <Link to="/booking" style={bookNowStyle}>
        Book Now
      </Link>
    </div>
  );
};

export default Servicescreen;
