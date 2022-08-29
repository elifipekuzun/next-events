import React from 'react';

import styles from './logistics-item.module.css';

type LogisticsItemProps = {
  children: React.ReactNode;
  icon(): JSX.Element;
};

export const LogisticsItem: React.FC<LogisticsItemProps> = ({
  children,
  icon,
}) => {
  return (
    <li className={styles.item}>
      <span className={styles.icon}>{icon()}</span>
      <span className={styles.content}>{children}</span>
    </li>
  );
};
