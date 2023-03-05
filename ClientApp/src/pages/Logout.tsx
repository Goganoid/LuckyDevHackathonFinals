import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { DarkHeader as Header, Logoutmain } from '../components';

const LogoutPage: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Header />
    <Logoutmain />
  </Fragment>
);

export default LogoutPage;