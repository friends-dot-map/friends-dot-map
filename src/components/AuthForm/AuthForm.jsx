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
    <>
      <h1 className="text-dark font-semibold font-cursive text-4xl bg-olive bg-opacity-20 w-full p-5 rounded-md text-center">
        <span className="text-teal">friends</span>.
        <span className="text-orange">map</span>(📍)
      </h1>
      <div className="flex flex-col text-center items-center justify-evenly text-xl p-5 h-full">
        {isSigningUp ? (
          <p className="text-3xl font-semibold">Welcome!</p>
        ) : (
          <p className="text-3xl font-semibold">Welcome back!</p>
        )}
        <hr className="w-1/2 h-1 bg-dark opacity-30 border-1 rounded-md" />
        <form className="flex flex-col items-center w-3/4 space-y-5">
          <input
            aria-label="email"
            className="p-2 rounded-md"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            aria-label="password"
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
        {isSigningUp ? (
          <>
            <p>
              Already have an account?{' '}
              <Link className="font-semibold block" to="/login">
                Log In
              </Link>
            </p>
          </>
        ) : (
          <>
            <p>
              Need to make an account?{' '}
              <Link className="font-semibold block" to="/register">
                Register
              </Link>
            </p>
          </>
        )}
        <p className="text-xl bg-white bg-opacity-70 p-5 rounded-md">
          A convenient travel companion to keep your group safe and organized
          when in unfamiliar places.
        </p>
        <div className="h-1/6"></div>
      </div>
    </>
  );
}
