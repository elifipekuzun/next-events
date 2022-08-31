import { EventSummary } from '../../components/event-detail/event-summary';
import { EventLogistics } from '../../components/event-detail/event-logistics';
import { EventContent } from '../../components/event-detail/event-content';
import { Button } from '../../components/ui/button';
import { ErrorAlert } from '../../components/ui/error-alert';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Event, getData } from '../../event-model';

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
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await getData();
  const paths = new Array(3).fill(0).map((_, i) => {
    return {
      params: {
        eventid: data[i].id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export default EventDetailPage;
