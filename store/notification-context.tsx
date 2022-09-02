import React, {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react';
import { Status } from '../components/ui/notification';

export interface NotificationState {
  title: string | null;
  message: string | null;
  status: string | null;
}

export interface Props {
  state: NotificationState;
  showNofification: (notification: NotificationState) => void;
  hideNotification: () => void;
}

export const NotificationContext = createContext<Props | null>(null);

const NotificationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [notificationState, setNotificationState] = useState<NotificationState>(
    {
      title: null,
      message: null,
      status: null,
    }
  );

  useEffect(() => {
    if (
      notificationState.status &&
      (notificationState.status === Status.success ||
        notificationState.status === Status.error)
    ) {
      const timer = setTimeout(() => {
        setNotificationState({ title: null, message: null, status: null });
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notificationState]);

  const showNofification = (notification: NotificationState) => {
    const newState = {
      title: notification.title,
      message: notification.message,
      status: notification.status,
    };
    setNotificationState(newState);
  };
  const hideNotification = () => {
    setNotificationState({ title: null, message: null, status: null });
  };

  const context = {
    state: notificationState,
    showNofification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
