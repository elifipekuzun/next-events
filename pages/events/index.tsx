import { NextPage, GetServerSideProps } from 'next';
import { EventList } from '../../components/events/event-list';
import { EventsSearch } from '../../components/events/events-search';
import { Event, DateFilter, getData } from '../../dummy-data';
import { useRouter } from 'next/router';

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
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  EventsProps,
  DateFilter
> = async (content) => {
  const data = await getData();
  return {
    props: {
      events: data,
    },
  };
};

export default EventsPage;
