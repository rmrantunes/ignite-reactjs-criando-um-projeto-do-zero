import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Header from '../components/Header';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();
  const isCurrentPageIndex = router.asPath === '/';

  return (
    <>
      <Header isCurrentPageIndex={isCurrentPageIndex} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
