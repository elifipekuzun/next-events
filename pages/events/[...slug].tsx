import { EventList } from '../../components/events/event-list';
import { ResultsTitle } from '../../components/results-title/results-title';
import { ErrorAlert } from '../../components/ui/error-alert';
import { Button } from '../../components/ui/button';
import { NextPage, GetServerSideProps } from 'next';
import { Event, getData } from '../../event-model';
import { ParsedUrlQuery } from 'querystring';

interface EventsProps {
  filteredEvents: Event[];
  date: string;
}

interface Params extends ParsedUrlQuery {
  slug: string[];
}

const FilteredEventsPage: NextPage<EventsProps> = ({
  filteredEvents,
  date,
}) => {
  if (!filteredEvents || !filteredEvents.length) {
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
  const formattedDate = new Date(date);
  return (
    <div>
      {date && <ResultsTitle date={formattedDate} />}
      <EventList items={filteredEvents} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  EventsProps,
  Params
> = async (content) => {
  if (!content.params) {
    return { notFound: true };
  }
  const { slug } = content.params;

  const year = slug[0];
  const month = slug[1];
  const parsedYear = parseInt(year);
  const parsedMonth = parseInt(month);

  if (typeof parsedYear !== 'number' && typeof parsedMonth !== 'number') {
    return { notFound: true };
  }
  const data = await getData();
  const filteredEvents = data.filter((e: Event) => {
    const date = new Date(e.date);
    const m = date.getMonth();
    const y = date.getFullYear();
    return y === parsedYear && m === parsedMonth - 1;
  });
  if (!filteredEvents || !filteredEvents.length) {
    return { notFound: true };
  }
  return {
    props: {
      filteredEvents,
      date: filteredEvents[0].date,
    },
  };
};

export default FilteredEventsPage;
