import React from 'react';
import { getFeaturedEvents } from '../dummy-data';

import { EventList } from '../components/events/event-list';

const Home: React.FC = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default Home;
