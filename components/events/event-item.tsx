import React from 'react';
import { Event } from '../../event-model';
import Image from 'next/image';
import styles from './event-item.module.css';
import { Button } from '../ui/button';
import { DateIcon } from '../icons/date-icon';
import { ArrowRightIcon } from '../icons/arrow-right-icon';
import { AddressIcon } from '../icons/address-icon';

type EventItemProps = {
  item: Event;
};

export const EventItem: React.FC<EventItemProps> = ({ item }) => {
  const humanReadableDate = new Date(item.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = item.location.replace(', ', '\n');

  return (
    <li className={styles.item}>
      <Image src={'/' + item.image} alt={item.title} width={250} height={160} />
      <div className={styles.content}>
        <div>
          <h2>{item.title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button href={`/events/${item.id}`}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};
