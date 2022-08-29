import React from 'react';

import styles from './event-summary.module.css';

type SummaryProps = {
  title: string;
};

export const EventSummary: React.FC<SummaryProps> = ({ title }) => {
  return (
    <section className={styles.summary}>
      <h1>{title}</h1>
    </section>
  );
};
