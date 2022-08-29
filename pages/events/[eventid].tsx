import React, { useEffect, useState } from 'react';
import { getEventById } from '../../dummy-data';
import { useRouter } from 'next/router';
import { Event } from '../../dummy-data';

import { EventSummary } from '../../components/event-detail/event-summary';
import { EventLogistics } from '../../components/event-detail/event-logistics';
import { EventContent } from '../../components/event-detail/event-content';
import { Button } from '../../components/ui/button';
import { ErrorAlert } from '../../components/ui/error-alert';

const EventDetailPage: React.FC = () => {
  const router = useRouter();
  const eventId = router.query.eventid;

  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    if (eventId) {
      const fetchedEvent = getEventById(eventId);
      setEvent(fetchedEvent);
    }
  }, [eventId]);

  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
        <div className="center">
          <Button href={'/events'}>Show all events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics item={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;
