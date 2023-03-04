import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { Footer, DarkHeader, RegisterCompany } from '../components';

const RegisterAsCompany: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <DarkHeader />
    <RegisterCompany />
    <Footer />
  </Fragment>
);

export default RegisterAsCompany;