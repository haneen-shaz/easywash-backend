import React from 'react'
import {Card  } from 'react-bootstrap'
import Rating from '../Components/Rating'
import { Link } from 'react-router-dom'


const Service = ({service}) => {
  
  return (
    <Card className='my-3 py-3 rounded'>
    <Link to={`/service/${service._id}`}>
      <Card.Img src={service.image} />
    </Link>
    <Card.Body>
      <Link to={`/service/${service._id}`}>
        <Card.Title as='div'>
          <strong style={{ fontSize: '18px', color: 'orange', textAlign: 'center', display: 'block', textDecoration: 'none' }}>{service.name}</strong>
        </Card.Title>
      </Link>
      <Card.Text as='div'>
        <div className='my-3' style={{ textAlign: 'center' }}>
          {service.rating} from {service.numreviews} Reviews
        </div>
      </Card.Text>
      
      <Card.Text as='h3' style={{ fontSize: '15px', textAlign: 'center' }}>
        Rs{service.price}
      </Card.Text>
      <Card.Text as="div">
                    <div className="my-3">
                        <Rating value= {service.rating} text={`${service.numreviews}  reviews`} color={'#f8e825'} style={{textAlign:'center'}} />
                    </div>
                </Card.Text>
    </Card.Body>
  </Card>
);
}
  
export default Service
