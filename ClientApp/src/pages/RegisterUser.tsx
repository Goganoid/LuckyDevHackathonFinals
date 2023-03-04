import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { Footer, DarkHeader, RegisterUser } from '../components';

const RegisterAsUser: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <DarkHeader />
    <RegisterUser />
    <Footer />
  </Fragment>
);

export default RegisterAsUser;