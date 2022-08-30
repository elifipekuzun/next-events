export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export interface EventsApi {
  [key: string]: Event;
}

export interface EventsProps {
  events: Event[];
}

export type DateFilter = {
  month: string;
  year: string;
};

export const getData = async () => {
  const url = 'https://nextjs-db-a583e-default-rtdb.firebaseio.com/events.json';
  const buffer = await fetch(url);
  const data: EventsApi = await buffer.json();
  const dataArray = [];
  for (const key in data) {
    dataArray.push({ ...data[key], id: key });
  }
  return dataArray as Event[];
};
