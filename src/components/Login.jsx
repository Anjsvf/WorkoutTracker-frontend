import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };

    try {
      const res = await axios.post('https://workouttracker-backend-vvkf.onrender.com/api/auth/login', user,);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      navigate('/Dashboard');
    } catch (err) {
      console.error(err.response.data);
      alert('falhar ao entrar')
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      
      <div className="w-full max-w-md overflow-hidden bg-[#181418bb]  p-8 shadow-md rounded">
        <h2 className="text-2xl mb-6 text-center text-white">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-white">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white">Senha</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-fuchsia-800 text-white py-2 rounded hover:bg-fuchsia-900"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          Não possui uma conta? <Link to="/" className="text-blue-500">Registre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
