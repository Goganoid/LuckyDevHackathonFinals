import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import Profilemain from '../components/Profilemain';
import { Footer, DarkHeader as Header } from '../components';

const Profile: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Header />
    <Profilemain />
    <Footer />
  </Fragment>
);

export default Profile;