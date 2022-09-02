import React, { PropsWithChildren, useContext } from 'react';
import { MainHeader } from './main-header';
import { Notification } from '../ui/notification';
import { Status } from '../ui/notification';
import { NotificationContext, Props } from '../../store/notification-context';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { state } = useContext(NotificationContext) as Props;

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {state.message && (
        <Notification
          title={state.title}
          message={state.message}
          status={state.status}
        />
      )}
    </>
  );
};

export default Layout;
