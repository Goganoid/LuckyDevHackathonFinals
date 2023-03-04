import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { Footer, DarkHeader } from '../components';
import UserList from '../components/Lists/UserList';

const UsersPage: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <DarkHeader />
    <UserList />
    <Footer />
  </Fragment>
);

export default UsersPage;