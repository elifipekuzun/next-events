import { EventsProps, EventsApi } from '../event-model';
import { EventList } from '../components/events/event-list';
import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { NewsletterRegistration } from '../components/input/newsletter-registration';

const Home: NextPage<EventsProps> = ({ events }) => {
  return (
    <div>
      <Head>
        <title>Nexts Events</title>
        {/* matters for search engines to show the app */}
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
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
    revalidate: 1800,
  };
};

export default Home;
