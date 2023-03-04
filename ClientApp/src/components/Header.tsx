import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const expand = 'lg';

interface Props {
  className?: string;
}

const StyledHeader = styled.header`
    background: #8639E8;
`;

const Header: React.FC<Props> = ({ className }) => {

  return (
    <StyledHeader>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand className="text-light" tag={Link} to="/">LuckyDevFinals</NavbarBrand>
          <NavbarToggler className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/projects">Projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/users">Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/profile">Name</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/profile">Profile</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
    </StyledHeader>
  )
};

export default Header;