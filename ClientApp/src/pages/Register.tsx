import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { Footer, DarkHeader, Registermain } from '../components';

const Register: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <DarkHeader />
    <Registermain />
    <Footer />
  </Fragment>
);

export default Register;