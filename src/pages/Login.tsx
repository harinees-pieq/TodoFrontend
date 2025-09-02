import { useState, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { loginUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      navigate('/todos');
    }
  }, []);

  const handleLogin = async () => {
    setError('');
    try {
      const res = await loginUser({ username, password });
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userId', res.data.userId); 
      navigate('/todos');
    } catch (e: any) {
      setError(e.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="mt-2 text-sm text-red-500 mb-3">{error}</p>}
      <Button onClick={handleLogin}>Login</Button>
      <p className="mt-4 text-sm text-center">
        Don’t have an account? <Link to="/register" className="text-blue-600 underline">Register</Link>
      </p>
    </div>
  );
}
