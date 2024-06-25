import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [calories, setCalories] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get('https://workouttracker-backend-vvkf.onrender.com/api/workouts', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setWorkouts(res.data);
      } catch (err) {
        setError('Failed to fetch workouts.');
      } finally {
        setLoading(false);
      }
    };
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    fetchWorkouts();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newWorkout = { type, duration, distance, calories, notes };

    try {
      const res = await axios.post('https://workouttracker-backend-vvkf.onrender.com/api/workouts', newWorkout, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setWorkouts([res.data, ...workouts]);
      // Clear form
      setType('');
      setDuration('');
      setDistance('');
      setCalories('');
      setNotes('');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className=" bg-slate-900">
        <h2 className="text-2xl text-white mb-6">olá, {username}</h2>
      <h2 className="text-2xl mb-6  text-white"> Seu Painel de monitoramento físico</h2>
      <form onSubmit={onSubmit} className="bg-slate-800 p-6 rounded shadow-md mb-6">
        <div className="mb-4">
          <label className="block text-white">Tipo</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Duração (minutos)</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Distância(km)</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Calorias</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-white">observação</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded  hover:bg-gray-800"
        >
          Adicionar treino
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl mb-4 text-white">Seu treino</h3>
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : workouts.length === 0 ? (
          <p className=' font-bold text-white'>Nenhum treino encontrado</p>
        ) : (
          <ul>
            {Array.isArray(workouts) && workouts.map((workout) => (
              <li key={workout._id} className="mb-4 p-4 text-white bg-slate-800 rounded shadow">
                <div>
                  <strong>Type:</strong> {workout.type}
                </div>
                <div>
                  <strong>Duração:</strong> {workout.duration} minutos
                </div>
                {workout.distance && (
                  <div>
                    <strong>Distância:</strong> {workout.distance} km
                  </div>
                )}
                {workout.calories && (
                  <div>
                    <strong>Calorias:</strong> {workout.calories}
                  </div>
                )}
                {workout.notes && (
                  <div>
                    <strong>observação:</strong> {workout.notes}
                  </div>
                )}
                <button
                  onClick={async () => {
                    try {
                      await axios.delete(`https://workouttracker-backend-vvkf.onrender.com/api/workouts/${workout._id}`, {
                        headers: { 'x-auth-token': localStorage.getItem('token') },
                      });
                      setWorkouts(workouts.filter((w) => w._id !== workout._id));
                    } catch (err) {
                      console.error(err.response.data);
                    }
                  }}
                  className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Apagar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
