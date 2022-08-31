import { EventList } from '../../components/events/event-list';
import { ResultsTitle } from '../../components/results-title/results-title';
import { ErrorAlert } from '../../components/ui/error-alert';
import { Button } from '../../components/ui/button';
import { NextPage, GetServerSideProps } from 'next';
import { Event, getData } from '../../event-model';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';

interface EventsProps {
  filteredEvents: Event[];
  date: string;
  hasError: boolean;
}

interface Params extends ParsedUrlQuery {
  slug: string[];
}

const FilteredEventsPage: NextPage<EventsProps> = ({
  filteredEvents,
  date,
  hasError,
}) => {
  const headData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for ${date}`} />
    </Head>
  );

  if (hasError) {
    return (
      <>
        {headData}
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
      {headData}
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
    return { props: { hasError: true, filteredEvents: [], date: '0' } };
  }
  const { slug } = content.params;

  const year = slug[0];
  const month = slug[1];
  const parsedYear = parseInt(year);
  const parsedMonth = parseInt(month);

  if (typeof parsedYear !== 'number' && typeof parsedMonth !== 'number') {
    return { props: { hasError: true, filteredEvents: [], date: '0' } };
  }
  const data = await getData();
  const filteredEvents = data.filter((e: Event) => {
    const date = new Date(e.date);
    const m = date.getMonth();
    const y = date.getFullYear();
    return y === parsedYear && m === parsedMonth - 1;
  });
  if (!filteredEvents) {
    return { notFound: true };
  }
  if (!filteredEvents.length) {
    return { props: { hasError: true, filteredEvents: [], date: '0' } };
  }
  return {
    props: {
      filteredEvents,
      date: filteredEvents[0].date,
      hasError: false,
    },
  };
};

export default FilteredEventsPage;
