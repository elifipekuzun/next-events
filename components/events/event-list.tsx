import React from 'react';

import { Event } from '../../event-model';
import { EventItem } from './event-item';
import styles from './event-list.module.css';

type EventListProps = {
  items: Event[];
};

export const EventList: React.FC<EventListProps> = ({ items }) => {
  return (
    <ul className={styles.list}>
      {items.map((item: Event) => (
        <EventItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
