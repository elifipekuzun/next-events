import React, { PropsWithChildren } from 'react';

import styles from './error-alert.module.css';

export const ErrorAlert: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.alert}>{children}</div>;
};
