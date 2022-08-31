import React, { useRef } from 'react';
import { Button } from '../ui/button';
import styles from './event-search.module.css';
import { DateFilter } from '../../event-model';

interface SearchProps {
  onSearch: (dateFilter: DateFilter) => void;
}

export const EventsSearch: React.FC<SearchProps> = ({ onSearch }) => {
  const monthRef = useRef<HTMLSelectElement>(null);
  const yearRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (
      monthRef.current &&
      yearRef.current &&
      typeof monthRef.current.value === 'string' &&
      typeof yearRef.current.value === 'string'
    ) {
      const dateFilter = {
        month: monthRef.current.value,
        year: yearRef.current.value,
      };
      onSearch(dateFilter);
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearRef}>
            <option value={2021}>2021</option>
            <option value={2022}>2022</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthRef}>
            <option value={1}>January</option>
            <option value={2}>Fabruary</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
        </div>
      </div>
      <Button typeName="button" onClick={() => {}} href={''}>
        Find Events
      </Button>
    </form>
  );
};
