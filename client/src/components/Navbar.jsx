import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">Thrift <span>Shop</span></Link>

        <ul className="nav-links">
          <li><Link to="/add">Add</Link></li>
          <li><Link to="/men">Men</Link></li>
          <li><Link to="/women">Women</Link></li>
          <li><Link to="/kids">Kids</Link></li>
        </ul>

        <div className="nav-actions">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
          </Link>

          <div className="user-dropdown" onClick={toggleDropdown}>
            <FaUser className="user-icon" />
            {dropdownOpen && (
              <div className="dropdown-menu">
                {user ? (
                  <>
                    <p className="user-greeting">Hi, {user.name}!</p>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
