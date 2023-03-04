import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import Profilemain from '../components/Profilemain';
import { Footer, DarkHeader } from '../components';

const Profile: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <DarkHeader />
    <Profilemain />
    <Footer />
  </Fragment>
);

export default Profile;