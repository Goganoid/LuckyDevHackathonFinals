import React, { type FunctionComponent, type PropsWithChildren } from 'react';
import { Header, Main } from '../components';

const HomePage: FunctionComponent<PropsWithChildren>  = () => {
  return (
    <div>
      <Header  />
      <Main />
    </div>
  )
}

export default HomePage;