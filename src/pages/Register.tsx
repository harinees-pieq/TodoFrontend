import { useState, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      navigate('/todos');
    }
  }, []);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
    setError('');
    if (!username || !email || !password || !confirmPassword) {
      return setError('All fields are required.');
    }
  
    if (!validateEmail(email)) {
      return setError('Invalid email format.');
    }
  
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
  
    try {
      const res = await registerUser({ username, password, email });
      alert(res.data.message);
      navigate('/login');
    } catch (e: any) {
      setError(e.response?.data?.message || 'Registration failed');
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      {error && <p className="mt-2 text-sm text-red-500 mb-3">{error}</p>}
      <Button onClick={handleRegister}>Register</Button>
      <p className="mt-4 text-sm text-center">
        Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
      </p>
    </div>
  );
}
