import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import Profilemain from '../components/Profilemain';
import { Footer, DarkHeader as Header } from '../components';
import { isCompany } from '../utils/storage';
import CompanyProfile from '../components/CompanyProfile';

const Profile: FunctionComponent<PropsWithChildren> = () => {
  console.log(isCompany());
  return (
  <Fragment>
    <Header />
    {isCompany() ? <CompanyProfile/> : <Profilemain /> }
    <Footer />
  </Fragment>
)};

export default Profile;