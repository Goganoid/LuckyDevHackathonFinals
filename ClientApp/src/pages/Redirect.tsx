import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { Redirect, LightHeader as Header } from '../components';

const RedirectPage: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Header />
    <Redirect />
  </Fragment>
);

export default RedirectPage;