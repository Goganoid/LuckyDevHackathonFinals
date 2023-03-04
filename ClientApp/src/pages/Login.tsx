import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { LightHeader as Header, Loginmain } from '../components';

const Login: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Header />
    <Loginmain />
  </Fragment>
);

export default Login;