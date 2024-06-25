
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './image.css'
import './App.css'
//
const App = () => (
  <div className='background-container'>
    <div className="content">
      <Routes>
      <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>

  </div>
  
);

export default App;