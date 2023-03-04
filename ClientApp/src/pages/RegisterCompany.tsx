import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { LightHeader as Header, RegisterCompany } from '../components';

const RegisterAsCompany: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Header />
    <RegisterCompany />
  </Fragment>
);

export default RegisterAsCompany;