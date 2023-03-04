import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { Footer, LightHeader as Header, Registermain } from '../components';

const Register: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Header />
    <Registermain />
    <Footer />
  </Fragment>
);

export default Register;