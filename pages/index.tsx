import { EventsProps, EventsApi, Event } from '../event-model';
import { EventList } from '../components/events/event-list';
import { NextPage, GetStaticProps } from 'next';

const Home: NextPage<EventsProps> = ({ events }) => {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<EventsProps> = async () => {
  const url = 'https://nextjs-db-a583e-default-rtdb.firebaseio.com/events.json';
  const buffer = await fetch(url);
  const data: EventsApi = await buffer.json();
  const events = [];
  for (let key in data) {
    if (data[key].isFeatured) {
      events.push({ ...data[key], id: key });
    }
  }
  return {
    props: {
      events,
    },
  };
};

export default Home;
