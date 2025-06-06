import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock API call for demonstration
  const mockAPI = {
    post: async (endpoint, data) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login validation
      if (data.email === 'demo@example.com' && data.password === 'password123') {
        return { data: { token: 'mock-jwt-token-12345' } };
      } else {
        throw {
          response: {
            data: { message: 'Invalid email or password' }
          }
        };
      }
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await mockAPI.post('/auth/login', { email, password });
      // In a real app, you'd use localStorage.setItem('token', res.data.token);
      // For demo purposes, we'll just call onLogin
      console.log('Login successful! Token:', res.data.token);
      if (onLogin) {
        onLogin(res.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 px-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg p-10 max-w-md w-full transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Welcome Back</h2>
        
        {error && (
          <div className="mb-6 text-center text-red-600 font-medium bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 font-medium">Demo Credentials:</p>
          <p className="text-sm text-blue-600">Email: demo@example.com</p>
          <p className="text-sm text-blue-600">Password: password123</p>
        </div>
        
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="w-full mb-6 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        />

        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={isLoading}
          className="w-full mb-8 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        />

        <button
          type="button"
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Logging in...
            </>
          ) : (
            'Log In'
          )}
        </button>
        
        <div className="mt-6 text-center">
          <a href="#" className="text-blue-600 hover:text-blue-800 text-sm transition">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;