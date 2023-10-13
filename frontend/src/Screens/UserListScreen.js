import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { listUsers } from '../actions/userAction';
import axios from '../Utils/Axios';
const UserListScreen = () => {
  
  const dispatch = useDispatch()
 
  const [data,setData]=useState()

  useEffect(() => {

    axios.get('users/admin/userslist')
      .then((response) => {
        console.log(response)
        setData(response.data)

       
      })
  }, []);
  console.log(data)
  const handleDelete = (userId) => {
    // Make a DELETE request to your API to delete the user
    axios
      .delete(`users/admin/delete/${userId}`)
      .then((response) => {
        // Handle success (e.g., update the UI)
        console.log('User deleted successfully');
        // You may want to update the 'data' state to remove the deleted user
        // Example: setData(data.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        // Handle errors (e.g., show an error message)
        console.error('Error deleting user:', error);
      });
  };
  


  return (
    <div>
            <h1>USERS</h1>
           
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>
                           
                            <tbody>
  {data?.map((userData) => (
    <tr key={userData._id}>
      <td>{userData._id}</td>
      <td>{userData.name}</td>
      <td>{userData.email}</td>
      <td>
        {userData.isAdmin ? (
          <i className="fas fa-check" style={{ color: 'green' }}></i>
        ) : (
          <i className="fas fa-check" style={{ color: 'red' }}></i>
        )}
      </td>
      <td>
        <Button variant="danger" size="sm" onClick={() => handleDelete(userData._id)}>
          Delete
        </Button>
      </td>
    </tr>
  ))}
</tbody>
                        </Table>
                    
        </div>
              
  );
};

export default UserListScreen;
