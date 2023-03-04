import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { Footer, LightHeader as Header, RegisterCompany } from '../components';

const RegisterAsCompany: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Header />
    <RegisterCompany />
    <Footer />
  </Fragment>
);

export default RegisterAsCompany;