import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { DarkHeader, Footer, Logoutmain } from '../components';

const LogoutPage: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <DarkHeader />
    <Logoutmain />
    <Footer />
  </Fragment>
);

export default LogoutPage;