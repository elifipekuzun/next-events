import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import Head from 'next/head';
import NotificationProvider from '../store/notification-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="Next Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationProvider>
  );
}

export default MyApp;
