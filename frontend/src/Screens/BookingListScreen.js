import React,{useState,useEffect} from 'react'
import { Table } from 'react-bootstrap'
import axios from '../Utils/Axios'
import {Button} from 'react-bootstrap'
import { useSelector } from 'react-redux'

const BookingListScreen = () => {
  const [data,setData]=useState()
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const formatHumanReadableDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
    
  
  const handleDelete = (bookingId) => {
    
    axios
      .delete(`services/admin/delete/${bookingId}`)
      .then((response) => {
        
        console.log('booking deleted successfully');
       
      })
      .catch((error) => {
        
        console.error('Error deleting bookings:', error);
      });
  };
useEffect(() => {

        axios.get('services/admin/bookinglist')
          .then((response) => {
            console.log(response)
            setData(response.data)
    
           
          })
      }, []);
      console.log('fgjh',data)
  return (
    <div>
        
      
      <h1>BOOKINGS</h1>
           
           <Table striped bordered hover responsive className='table-sm'>
               <thead>
                   <tr>
                       <th>USER</th>
                       <th>SERVICE</th>
                       <th>DATE</th>
                       <th>TIME SLOT</th>
                       <th></th>
                   </tr>
               </thead>
                   
               <tbody>
  
        {/* <Button variant="danger" size="sm" >
          Delete
        </Button>
       */}
     {data?.map((userData) => (
    <tr key={userData.id}>
      <td>{userData.user.name}</td>
      <td>{userData.service}</td>
      <td>{formatHumanReadableDate(userData.date)}</td>
      <td>{userData.time_slot}</td>
      <td>
        {/* <Button variant="danger" size="sm" onClick={() => handleDelete(userData.id)}>
          Delete
        </Button> */}
      </td>
    </tr>
  ))}
  
</tbody>
        </Table>
    </div>
  )
}

export default BookingListScreen
