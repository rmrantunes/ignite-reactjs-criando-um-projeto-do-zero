import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Nprogress from 'nprogress';
import Header from '../components/Header';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();
  const isCurrentPageIndex = router.asPath === '/';

  function handleStart(): void {
    Nprogress.start();
  }

  function handleStop(): void {
    Nprogress.done();
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/nprogress.css" />
      </Head>
      <Header
        isCurrentPageIndex={isCurrentPageIndex}
        isPreview={pageProps.isPreview}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
