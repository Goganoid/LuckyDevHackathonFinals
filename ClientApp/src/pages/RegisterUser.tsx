import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { Footer, LightHeader as Header, RegisterUser } from '../components';

const RegisterAsUser: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Header />
    <RegisterUser />
    <Footer />
  </Fragment>
);

export default RegisterAsUser;