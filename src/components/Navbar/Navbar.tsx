import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context';
import './navbar.scss';
import { useAuth, useQuiz } from '../../context';
import { makeToast } from '..';
import QUIZLY_LOGO from '../../assets/quizly-logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { authState, authDispatch } = useAuth();
  const { quizDispatch } = useQuiz();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuClick = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    makeToast('You Are Now Logged Out', 'success');
    authDispatch({
      type: 'LOGOUT',
    });
    quizDispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const sidebarLinks = [
    {
      name: 'Home',
      link: '/',
      icon: <i className='fa-solid fa-house mr-3'></i>,
    },
  ];

  const handleAuth = () => {
    if (authState.isAuth) {
      handleLogout();
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false);
  };
  return (
    <div className='navigationbar-container'>
      <div className='navbar'>
        <div className='navbar-header'>
          <i
            className='fa-solid fa-bars menu-hamburg fa-2x mr-2'
            onClick={toggleMenuClick}
          ></i>
          <Link to='/'>
            <img src={QUIZLY_LOGO} alt='quizly icon' className='navbar-icon' />
          </Link>
          <Link to='/'>
            <div className='h2 color-primary'>Quizly</div>
          </Link>
        </div>

        <div className='navigation-buttons'>
          <div className='theme-container' onClick={toggleTheme}>
            {theme === 'light' ? (
              <i className='fa-regular fa-moon'></i>
            ) : (
              <i className='fa-solid fa-sun'></i>
            )}
          </div>
          {authState.isAuth && authState.token ? (
            <div className='dropdown'>
              <div className='avatar-text avatar-circular avatar-small'>
                {authState.user.firstName.charAt(0).toUpperCase() +
                  authState.user.lastName.charAt(0).toUpperCase()}
              </div>
              <div className='dropdown-content'>
                <div onClick={() => navigate('/profile')}>Profile</div>
                <div onClick={handleLogout}>Logout</div>
              </div>
            </div>
          ) : (
            <Link to='/login'>
              <button className='btn btn-primary-outlined login-btn'>
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className={`menu-container ${isMenuOpen ? 'visible' : ''}`}>
        <div className='menu-sidebar'>
          <ul className='sidebar-link-container'>
            {sidebarLinks.map((item) => (
              <li key={item.name} onClick={() => setIsMenuOpen(false)}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive ? 'link-item link-isActive' : 'link-item'
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
            {authState.isAuth && (
              <li>
                <NavLink
                  to='/profile'
                  className={({ isActive }) =>
                    isActive ? 'link-item link-isActive' : 'link-item'
                  }
                >
                  <i className='fa-solid fa-user mr-3'></i>
                  Profile
                </NavLink>
              </li>
            )}
            <li className='link-item' onClick={handleAuth}>
              <i className='fa-solid fa-arrow-right-from-bracket mr-3'></i>
              {authState.isAuth ? 'Logout' : 'Login'}
            </li>
            <li
              className='link-item close-menu'
              onClick={() => setIsMenuOpen(false)}
            >
              <i className='fa-solid fa-circle-xmark mr-3'></i>Close
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { Navbar };
