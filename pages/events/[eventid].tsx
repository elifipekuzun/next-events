import { EventSummary } from '../../components/event-detail/event-summary';
import { EventLogistics } from '../../components/event-detail/event-logistics';
import { EventContent } from '../../components/event-detail/event-content';
import { Button } from '../../components/ui/button';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Event, getData } from '../../event-model';
import Head from 'next/head';

interface Params extends ParsedUrlQuery {
  eventid: string;
}

interface EventProps {
  event: Event;
}

const EventDetailPage: NextPage<EventProps> = ({ event }) => {
  if (!event) {
    return (
      <>
        <div className="center">
          <p>Loading...</p>
        </div>
        <div className="center">
          <Button href={'/events'}>Show all events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics item={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export const getStaticProps: GetStaticProps<EventProps, Params> = async (
  content
) => {
  if (!content.params) {
    return { notFound: true };
  }
  const eventId = content.params.eventid && content.params.eventid;
  const data = await getData();
  const event = data.find((e: Event) => e.id === eventId);
  if (!event) {
    return { notFound: true };
  }
  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await getData();
  const featuredEvents = data.filter((e: Event) => e.isFeatured === true);
  const paths = new Array(featuredEvents.length).fill(0).map((_, i) => {
    return {
      params: {
        eventid: featuredEvents[i].id,
      },
    };
  });
  return {
    paths,
    fallback: 'blocking',
  };
};

export default EventDetailPage;
