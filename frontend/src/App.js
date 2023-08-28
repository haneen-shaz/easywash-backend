import { Container } from 'react-bootstrap'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Homescreen from './Screens/Homescreen'
import Servicescreen from './Screens/Servicescreen'
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AdminScreen from './Screens/AdminScreen';
import BookingScreen from './Screens/BookingScreen';

function App() {
  return (
    <Router>
      
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
          <Route path='/' Component={Homescreen} exact/>
          <Route path='/login' Component={LoginScreen} />
          <Route path='/admin' Component={AdminScreen} />
          <Route path='/register' Component={RegisterScreen} />
          <Route path='/profile' Component={ProfileScreen} />
          <Route path='/booking' Component={BookingScreen} />
          
          <Route path="/service/:id"  Component={Servicescreen} />

          </Routes>
        
        
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
