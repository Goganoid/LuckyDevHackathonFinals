import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { Footer, DarkHeader } from '../components';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Redirect: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
      <NavbarBrand tag={Link} to="/">LuckyDevFinals</NavbarBrand>
      <NavbarToggler className="mr-2" />
      <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
        <ul className="navbar-nav flex-grow">
          <NavItem>
            <NavLink tag={Link} to="/user/register">RegisterAsUser</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/company/register">RegisterAsCompany</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/login">Login</NavLink>
          </NavItem>
        </ul>
      </Collapse>
    </Navbar>
    <Footer />
  </Fragment>
);

export default Redirect;