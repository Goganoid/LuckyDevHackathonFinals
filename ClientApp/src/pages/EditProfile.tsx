import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import EditProfilemain from '../components/EditProfilemain';
import { Footer, DarkHeader as Header } from '../components';

const EditProfile: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Header />
    <EditProfilemain />
    <Footer />
  </Fragment>
);

export default EditProfile;