import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #2c3e50;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #34495e;
  }
`;

const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!token) {
    return null;
  }

  return (
    <NavContainer>
      <Logo to="/dashboard">Elderly Care</Logo>
      <NavLinks>
        <NavLink to="/tasks">Tasks</NavLink>
        <NavLink to="/medicine">Medicine</NavLink>
        <NavLink to="/grocery">Grocery</NavLink>
        <NavLink to="/emergency">Emergency</NavLink>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar; 