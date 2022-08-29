import React from 'react';
import { Button } from '../ui/button';
import styles from './results-title.module.css';

export const ResultsTitle: React.FC<{ date: Date }> = ({ date }) => {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  return (
    <section className={styles.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button href={'/events'}>Show all events</Button>
    </section>
  );
};
