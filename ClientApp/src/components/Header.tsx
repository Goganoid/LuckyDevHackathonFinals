import React from 'react';
import styled from 'styled-components';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { isCompany, isLoggedIn } from '../utils/storage';
import { getUserId } from '../utils/storage';

interface Props {
  className?: string;
  link: any;
}

const Logo = styled.img`
  width: 16px;
  height: 24px;
  transform: translate(2px, -3px);
`;

const HeaderNavbar: React.FC<Props> = ({link}) => {
  return (
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
      <NavbarBrand tag={Link} to="/"><Logo src={link} alt='L' />uckyDevFinals</NavbarBrand>
      <NavbarToggler className="mr-2" />
      <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
        <ul className="navbar-nav flex-grow">
          <NavItem className='nawbar-button'>
            <NavLink tag={Link} to="/projects">Projects</NavLink>
          </NavItem>
          <NavItem className='nawbar-button'>
            <NavLink tag={Link} to="/users">Users</NavLink>
          </NavItem>
          { !isLoggedIn() ?
          <>
            <NavItem className='nawbar-button'>
              <NavLink tag={Link} to="/redirect">Register</NavLink>
            </NavItem>
            <NavItem className='nawbar-button'>
              <NavLink tag={Link} to="/login">Login</NavLink>
            </NavItem>
          </> 
          :
          <>
            <NavItem className='nawbar-button'>
              <NavLink tag={Link} to={isCompany()?`/profile/company/${getUserId()}`:`/profile/user/${getUserId()}`}>Profile</NavLink>
            </NavItem>
            <NavItem className='nawbar-button'>
              <NavLink tag={Link} to="/logout">Logout</NavLink>
            </NavItem>
          </>
          }
        </ul>
      </Collapse>
    </Navbar>
    )
};
 
export const DarkHeader = () => {
  return (
    <header className='dark-header'>
        <HeaderNavbar link={require('../assets/logo-light.png')} />
    </header>
  )
};

export const LightHeader = () => {
  return (
    <header className='light-header'>
        <HeaderNavbar link={require('../assets/logo-dark.png')} />
    </header>
  )
};