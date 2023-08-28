import React ,{useState,useEffect} from  'react'
import {Row,Col} from 'react-bootstrap'
import Service from '../Components/Service'
import { useDispatch,useSelector } from 'react-redux'
import { listServices } from '../actions/serviceAction'
import Loader from '../Components/Loader'
import Message from '../Components/Message'


function Homescreen() {
    const dispatch=useDispatch()
    const serviceList=useSelector(state =>state.serviceList)
    const {error,loading,services}=serviceList
console.log(services)
  useEffect(()=>{
    dispatch(listServices())
   

  },[dispatch])

  return (
    <div>
        <img
  src="images/carwash.jpg"
  alt="Banner"
  className="banner-image"
  style={{ width: '100%', height: 'auto', maxWidth: '150%', maxHeight: '400px' }}
/>
        <h1 style={{ fontSize: '24px',textAlign:'center'}}>OUR SERVICES</h1>
        
        
            {loading ? <Loader />
                :error ? <Message variant='danger'>{error}</Message>
                 :
                 <Row>
                    {services.map(service=>(
                    <Col key={service._id} sm={12} md={6} lg={4} xl={3}>
                    <Service service={service}/>
                    </Col>

                    ))}
            
                </Row>
            }
        
        
      
    </div>
  )
}

export default Homescreen
