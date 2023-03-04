import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { DarkHeader, Logoutmain } from '../components';

const LogoutPage: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <DarkHeader />
    <Logoutmain />
  </Fragment>
);

export default LogoutPage;