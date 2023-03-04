import React from 'react';
import styled from 'styled-components';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const expand = 'lg';

interface Props {
  className?: string;
}

const HeaderNavbar: React.FC<Props> = () => {
  return (
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
      <NavbarBrand tag={Link} to="/">LuckyDevFinals</NavbarBrand>
      <NavbarToggler className="mr-2" />
      <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
        <ul className="navbar-nav flex-grow">
          <NavItem>
            <NavLink tag={Link} to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/projects">Projects</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/users">Users</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/profile">Name</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/profile">Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/register">Register</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/login">Login</NavLink>
          </NavItem>
        </ul>
      </Collapse>
    </Navbar>
    )
};
 
export const DarkHeader = () => {
  return (
    <header className='dark-header'>
        <HeaderNavbar />
    </header>
  )
};

export const LightHeader = () => {
  return (
    <header className='light-header'>
        <HeaderNavbar />
    </header>
  )
};