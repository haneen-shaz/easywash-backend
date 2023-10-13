import { Container } from 'react-bootstrap'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Homescreen from './Screens/Homescreen'
import Servicescreen from './Screens/Servicescreen'
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import BookingScreen from './Screens/BookingScreen';
import BookingSummaryScreen from './Screens/BookingSummaryScreen';
import UserListScreen from './Screens/UserListScreen';
import ServiceListScreen from './Screens/ServiceListScreen';
import ServiceAddScreen from './Screens/ServiceAddScreen';
import AdminHomeScreen from './Screens/AdminHome';
import BookingListScreen from './Screens/BookingListScreen';

import NotificationScreen from './Screens/NotificationScreen';
import Serviceupdatescreen from './Screens/Serviceupdatescreen';
import PreviousBookingScreen from './Screens/PreviousBookingScreen';
import AdminLoginScreen from './Screens/AdminLoginScreen';
import NotificationComponent from './Components/NotificationComponent';
import Appnotification from './Screens/Appnotification';




function App() {
  return (
    <Router>
      
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
          <Route path='/' Component={Homescreen} exact/>
          <Route path='/login' Component={LoginScreen} />
          
          <Route path='/register' Component={RegisterScreen} />
          <Route path='/profile' Component={ProfileScreen} />
          <Route path='/booking/:id' Component={BookingScreen} />
          <Route path="/service/:id"  Component={Servicescreen} />
          <Route path='/admin/userslist' Component={UserListScreen} />
          <Route path='/admin/servicelist' Component={ServiceListScreen} />
          <Route path='/admin/servicelist/addservice' Component={ServiceAddScreen} />
          <Route path='/adminhome/' Component={AdminHomeScreen} />
          <Route path='/admin/bookinglist' Component={BookingListScreen} />
          <Route path='/adminhome/Notifications' Component={NotificationScreen}/>
          <Route path='/admin/servicelist/update-service' Component={Serviceupdatescreen} />
          <Route path='/bookingsummary/:id' Component={BookingSummaryScreen}/>
          <Route path='/previousbookings' Component={PreviousBookingScreen}/>
          <Route path='/adminlogin/' Component={AdminLoginScreen}/>
          {/* <Route path='/noti' Component={Appnotification}/> */}
        
          

          </Routes>
        
        
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
