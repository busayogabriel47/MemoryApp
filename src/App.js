import {Container} from '@material-ui/core'
import {Routes, Route} from "react-router-dom" 

import Navbar from './Components/Nabvar/Navbar';
import Home from './Components/Home/Home';
import Auth from './Components/Auth/auth';


function App() {

  return (
    <Container maxWidth="lg">
        <Navbar/>
        <Routes>
            <Route  path='/' element={<Home/>}/>
            <Route exact path='/auth' element={<Auth/>}/>
        </Routes>
    </Container>
  );
}

export default App;
