import React from 'react';
import { EventList } from '../../components/events/event-list';
import { EventsSearch } from '../../components/events/events-search';
import { DateFilter } from '../../dummy-data';
import { getAllEvents } from '../../dummy-data';
import { useRouter } from 'next/router';

const EventsPage: React.FC = () => {
  const allEvents = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (dateFilter: DateFilter) => {
    const { month, year } = dateFilter;
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </div>
  );
};

export default EventsPage;
