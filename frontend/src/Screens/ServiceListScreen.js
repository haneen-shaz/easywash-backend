import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import axios from '../Utils/Axios';
import { Link } from 'react-router-dom';



const ServiceListScreen = () => {

    const [data,setData]=useState()
    


  useEffect(() => {

    axios.get('services/admin/servicelist/')
      .then((response) => {
        console.log(response)
        setData(response.data)
    })
  }, []);
  console.log(data)
  const handleDelete = (serviceId) => {
    axios
      .delete(`/services/admin/delete/${serviceId}`)
      .then((response) => {
        
        console.log('Service deleted successfully');
       
        setData(data.filter((service) => service._id !== serviceId));
      })
      .catch((error) => {
        console.error('Error deleting service:', error);
      });
  };
  
  
  return (
    <div>
      <h1>SERVICES</h1>
      <Table striped bordered hover responsive className='table-sm'>
  <thead>
    <tr>
      <th>ID</th>
      <th>SERVICE</th>
      <th>DESCRIPTION</th>
      <th>PRICE</th>
      <th>RATING</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {data?.map((service) => (
      <tr key={service._id}>
        <td>{service._id}</td>
        <td>{service.name}</td>
        <td>{service.description}</td>
        <td>{service.price}</td>
        <td>{service.rating}</td>
        <td>
        
        <Link className='btn btn-danger' size="sm" onClick={() => handleDelete(service._id)}>
          Delete
        </Link>

      
        </td>
        <td>
          
        <Link to="/admin/servicelist/update-service" className="btn btn-success" size="sm" >
          Update
        </Link>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
 
 <Link to="/admin/servicelist/addservice" className="btn btn-primary">
        Add Service
      </Link>


    </div>
  )
}

export default ServiceListScreen
