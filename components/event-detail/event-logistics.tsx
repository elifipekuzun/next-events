import React from 'react';
import Image from 'next/image';
import { AddressIcon } from '../icons/address-icon';
import { DateIcon } from '../icons/date-icon';
import { LogisticsItem } from './logistics-item';
import styles from './event-logistics.module.css';
import { Event } from '../../event-model';

type EventLogisticsProps = {
  item: Event;
};

export const EventLogistics: React.FC<EventLogisticsProps> = ({ item }) => {
  const humanReadableDate = new Date(item.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = item.location.replace(', ', '\n');
  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <Image
          src={'/' + item.image}
          alt={item.title}
          width={400}
          height={400}
        />
      </div>
      <ul className={styles.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};
