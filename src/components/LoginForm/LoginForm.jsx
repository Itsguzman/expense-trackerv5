import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/authentication/authenticationOperation'; // Your Redux thunk for login
// import { NavLink } from 'react-router-dom';
// import {
//   Heading,
//   Box,
//   Button,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Input,
// } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import css from './login.module.css';
import bgImage from '../assets/bgImage.jpg';
import Logo from '../assets/Logo.png';

// export const LoginForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Hook for navigation
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { error } = useSelector(state => state.auth);

//   const handleSubmit = async e => {
//     e.preventDefault();

//     if (!email || !password) {
//       alert('Please enter both email and password');
//       return;
//     }

//     const resultAction = await dispatch(logIn({ email, password }));

//     if (logIn.fulfilled.match(resultAction)) {
//       // Successful login, redirect to the desired page
//       navigate('/contacts'); // Redirect to /contacts or any other page you prefer
//     } else {
//       // Handle login failure (e.g., show an error message)
//       console.error('Login failed');
//     }
//   };

//   return (
//     <Box
//       as="form"
//       onSubmit={handleSubmit}
//       maxW="sm"
//       mx="auto"
//       mt={10}
//       p={6}
//       borderWidth={1}
//       borderRadius="md"
//       boxShadow="lg"
//     >

//       <Heading>Login</Heading>
//       <FormControl id="email" isInvalid={error && !email}>
//         <FormLabel>Email</FormLabel>
//         <Input
//           type="email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//           focusBorderColor="teal.500"
//         />
//       </FormControl>

//       <FormControl id="password" isInvalid={error && !password} mt={4}>
//         <FormLabel>Password</FormLabel>
//         <Input
//           type="password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//           focusBorderColor="teal.500"
//         />
//       </FormControl>

//       <Button type="submit" colorScheme="teal" width="full" mt={4}>
//         Login
//       </Button>
//       <Button
//         as={NavLink}
//         to="/register"
//         colorScheme="green"
//         width="full"
//         mt={4}
//       >
//         Create Account
//       </Button>

//       {error && (
//         <FormErrorMessage mt={2} color="red.500">
//           {error}
//         </FormErrorMessage>
//       )}
//     </Box>
//   );
// };

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { error } = useSelector(state => state.auth);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    const resultAction = await dispatch(logIn({ email, password }));

    if (logIn.fulfilled.match(resultAction)) {
      navigate('/contacts');
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div className={css.loginContainer}>
      <header className={css.loginHeader}>
        <img src={Logo} alt="Logo" className={css.loginLogo} />
      </header>
      <section className={css.loginContent}>
        <div className={css.loginImageSection}>
          <img
            src={bgImage}
            alt="Couple managing finances"
            className={css.loginMainImage}
          />
          <div className={css.loginBalanceCard}>
            <div className={css.loginBalanceText}>Your balance</div>
            <div className={css.loginBalanceAmount}>$632.000</div>
            <div className={css.loginBalanceChange}>+1.29%</div>
          </div>
        </div>
        <div className={css.loginTextSection}>
          <div class={css.loginFormSection}>
            <h2 class={css.loginFormHeading}>Sign In</h2>
            <p class={css.loginFormSubtext}>
              Welcome back to effortless expense tracking! Your financial
              dashboard awaits.
            </p>
            <form onSubmit={handleSubmit}>
              <div class={css.loginFormControl}>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div class={css.loginFormControl}>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" class={css.loginSigninButton}>
                Sign In
              </button>
              <p class={css.loginSignupText}>
                Don't have an account?{' '}
                <a href="#" class={css.loginSignupLink}>
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
      {/* <form onSubmit={handleSubmit} className={css.loginForm}>
        <div className={css.loginFormGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className={css.loginFormGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className={css.loginSubmitBtn}>
          Login
        </button>
        <NavLink to="/register" className={css.loginRegisterLink}>
          Create Account
        </NavLink>
        {error && <div className={css.loginErrorMessage}>{error}</div>}
      </form> */}
    </div>
  );
};
