
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './image.css'
import './App.css'
//
const App = () => (
  
    <div id='image' className="min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500 p-4">
      <Routes>
      <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  
);

export default App;