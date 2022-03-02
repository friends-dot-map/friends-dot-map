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
    <div>
      <h1>friends.map()</h1>
      <form>
        <label>
          email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="please enter your email"
          />
        </label>
        <label>
          password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="please enter your password"
          />
        </label>
        <button onClick={handleSubmit}>
          {isSigningUp ? 'Register' : 'Log In'}
        </button>
      </form>
      <p>
        a convenient travel companion to keep your group safe and organized when
        in unfamiliar places
      </p>
      {isSigningUp ? (
        <>
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </>
      ) : (
        <>
          <p>
            Need to make an account? <Link to="/register">Register</Link>
          </p>
        </>
      )}
    </div>
  );
}
