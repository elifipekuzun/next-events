import React from 'react';

import styles from './event-content.module.css';

type EventContentProps = {
  children: React.ReactNode;
};

export const EventContent: React.FC<EventContentProps> = ({ children }) => {
  return <section className={styles.content}>{children}</section>;
};
