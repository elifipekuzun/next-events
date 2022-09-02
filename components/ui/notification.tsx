import React, { useContext } from 'react';
import styles from './notification.module.css';
import {
  NotificationState,
  NotificationContext,
  Props,
} from '../../store/notification-context';

export enum Status {
  success = 'success',
  error = 'error',
  pending = 'pending',
}

export const Notification: React.FC<NotificationState> = ({
  title,
  message,
  status,
}) => {
  const { hideNotification } = useContext(NotificationContext) as Props;

  let statusClasses = '';

  if (status === Status.success) {
    statusClasses = styles.success;
  }

  if (status === Status.error) {
    statusClasses = styles.error;
  }

  if (status === Status.pending) {
    statusClasses = styles.pending;
  }

  const activeClasses = `${styles.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};
