import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { LightHeader as Header, RegisterUser } from '../components';

const RegisterAsUser: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Header />
    <RegisterUser />
  </Fragment>
);

export default RegisterAsUser;