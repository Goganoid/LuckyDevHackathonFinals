import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { DarkHeader, Footer, Loginmain } from '../components';

const Login: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <DarkHeader />
    <Loginmain />
    <Footer />
  </Fragment>
);

export default Login;