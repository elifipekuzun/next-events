import React, { useEffect, useState } from 'react';
import { EventList } from '../../components/events/event-list';
import { getFilteredEvents, Event } from '../../dummy-data';
import { useRouter } from 'next/router';
import { ResultsTitle } from '../../components/results-title/results-title';
import { ErrorAlert } from '../../components/ui/error-alert';
import { Button } from '../../components/ui/button';

const FilteredEventsPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [events, setEvents] = useState<Event[]>([]);
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (slug?.length) {
      const filteredEvents = getFilteredEvents({
        year: slug[0],
        month: slug[1],
      });
      const newDate = new Date(+slug[0], +slug[1] - 1);
      setDate(newDate);
      filteredEvents && setEvents(filteredEvents);
    }
  }, []);

  if (events.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found!</p>
        </ErrorAlert>
        <div className="center">
          <Button href={'/events'}>Show all events</Button>
        </div>
      </>
    );
  }

  return (
    <div>
      {date && <ResultsTitle date={date} />}
      <EventList items={events} />
    </div>
  );
};

export default FilteredEventsPage;
