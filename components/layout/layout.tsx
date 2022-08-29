import React, { PropsWithChildren } from 'react';
import { MainHeader } from './main-header';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};

export default Layout;
