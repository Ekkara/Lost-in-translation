import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Views/Login';
import Orders from './Views/Orders';
import Profile from './Views/Profile';
import Navbar from './components/Navbar/Navbar';
function App() {
 
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path = "/" element= {<Login />} />
        <Route path = "/orders" element={<Orders/>}/>
        <Route path = "/profile" element={<Profile />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
