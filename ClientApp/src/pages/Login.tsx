import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { LightHeader as Header, Footer, Loginmain } from '../components';

const Login: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Header />
    <Loginmain />
    <Footer />
  </Fragment>
);

export default Login;