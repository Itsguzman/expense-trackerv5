import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authentication/authenticationOperation';
import { NavLink } from 'react-router-dom';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    // Extract values from form fields
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    if (!name || !email || !password) {
      alert('All fields are required.');
      return;
    }

    // Dispatch register action
    dispatch(register({ name, email, password }));
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Username</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Username"
        required
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        required
      />

      <button type="submit">Register</button>
      <NavLink to="/login">
        <button type="button">Back to Login</button>
      </NavLink>
    </form>
  );
};
