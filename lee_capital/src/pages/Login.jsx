import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Demo: demo@leecapital.com / password123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002B5B]/10 to-[#3282B8]/10 pt-20 px-4">
      <div className="max-w-md w-full glass-card p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-[#002B5B] to-[#3282B8] rounded-2xl flex items-center justify-center">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-[#002B5B]">Welcome Back</h2>
          <p className="text-gray-500 mt-1">Access your Lee Capital portfolio</p>
        </div>
        {error && <div className="mb-4 p-3 bg-red-50 rounded-xl flex gap-2 text-red-700 text-sm"><AlertCircle size={18} />{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3282B8] focus:border-transparent" placeholder="investor@leecapital.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3282B8]" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary py-3 text-center disabled:opacity-70">
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">Demo: demo@leecapital.com / password123</p>
        <div className="mt-4 text-center"><Link to="/" className="text-[#3282B8] hover:underline text-sm">← Back to Home</Link></div>
      </div>
    </div>
  );
};

export default Login;