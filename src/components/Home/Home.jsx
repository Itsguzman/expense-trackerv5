import { NavLink } from 'react-router-dom';
import css from './home.module.css';
import bgImage from '../assets/bgImage.jpg';
import Logo from '../assets/Logo.png';
import users from '../assets/users.png';

export const Home = () => {
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
          <h2 className={css.loginExpenseLog}>EXPENSE LOG</h2>
          <h1 className={css.loginMainHeading}>
            Manage Your <span>Finances</span> Masterfully!
          </h1>
          <p className={css.loginDescription}>
            ExpenseTracker effortlessly empowers you to take control of your
            finances! With intuitive features, it simplifies the process of
            tracking and managing expenses, allowing for a stress-free mastery
            over your financial world.
          </p>
          <div className={css.loginButtons}>
            <NavLink to="/register" className={css.loginSignup}>
              Sign Up
            </NavLink>
            <NavLink to="/login" className={css.loginSignin}>
              Sign In
            </NavLink>
          </div>
          <div className={css.loginUserStats}>
            <div>
              <img src={users} alt="User 1" />
            </div>
            <div className={css.loginUserText}>
              1000 users + <br /> Trusted by users for reliable expense
              tracking!
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
