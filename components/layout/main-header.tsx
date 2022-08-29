import React from 'react';
import Link from 'next/link';
import styles from './main-header.module.css';

export const MainHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={'/'}>
          <a>NextEvents</a>
        </Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href={'/events'}>Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
