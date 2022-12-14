import { NextPage, GetStaticProps } from 'next';
import { EventList } from '../../components/events/event-list';
import { EventsSearch } from '../../components/events/events-search';
import { Event, DateFilter, getData } from '../../event-model';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface EventsProps {
  events: Event[];
}

const EventsPage: NextPage<EventsProps> = ({ events }) => {
  const router = useRouter();
  const findEventsHandler = (dateFilter: DateFilter) => {
    const { month, year } = dateFilter;
    router.push(`/events/${year}/${month}`);
  };
  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<EventsProps, DateFilter> = async (
  content
) => {
  const data = await getData();
  return {
    props: {
      events: data,
    },
    revalidate: 60,
  };
};

export default EventsPage;
