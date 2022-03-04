import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AuthForm({ handleAuth, isSigningUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuth(email, password);
  };

  return (
    <div className="flex flex-col space-y-5 text-center items-center text-xl p-5">
      {isSigningUp ? (
        <>
          <p className="font-semibold">
            already have an account? <Link to="/login">Log In</Link>
          </p>
        </>
      ) : (
        <>
          <p className="font-semibold">
            need to make an account? <Link to="/register">Register</Link>
          </p>
        </>
      )}
      <form className="flex flex-col items-center w-3/4 space-y-3">
        <input
          className="p-2 rounded-md"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          className="p-2 rounded-md"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button
          className="bg-teal text-white w-1/2 p-2 rounded-md"
          onClick={handleSubmit}
        >
          {isSigningUp ? 'Register' : 'Log In'}
        </button>
      </form>
      <p className="text-3xl bg-white bg-opacity-50">
        a convenient travel companion to keep your group safe and organized when
        in unfamiliar places
      </p>
    </div>
  );
}
