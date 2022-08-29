export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export type DateFilter = {
  month: string;
  year: string;
};

const DUMMY_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Programming for everyone',
    description:
      'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
    location: 'Somestreet 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image: 'images/coding-event.jpg',
    isFeatured: false,
  },
  {
    id: 'e2',
    title: 'Networking for introverts',
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: 'New Wall Street 5, 98765 New Work',
    date: '2021-05-30',
    image: 'images/introvert-event.jpg',
    isFeatured: true,
  },
  {
    id: 'e3',
    title: 'Networking for extroverts',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2022-04-10',
    image: 'images/extrovert-event.jpg',
    isFeatured: true,
  },
];

export function getFeaturedEvents(): Event[] {
  return DUMMY_EVENTS.filter((event: Event) => event.isFeatured);
}

export function getAllEvents(): Event[] {
  return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter: DateFilter): Event[] {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event: Event) => {
    const eventDate = new Date(event.date);
    const parsedYear = parseInt(year);
    const parsedMonth = parseInt(month);

    if (typeof parsedYear !== 'number' && typeof parsedMonth !== 'number') {
      return [];
    }
    return (
      eventDate.getFullYear() === parsedYear &&
      eventDate.getMonth() === parsedMonth - 1
    );
  });

  return filteredEvents;
}

export function getEventById(id: string | string[]) {
  return DUMMY_EVENTS.find((event: Event) => event.id === id);
}
