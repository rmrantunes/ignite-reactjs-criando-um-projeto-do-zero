import Link from 'next/link';
import { useRouter } from 'next/router';

import commonStyles from '../../styles/common.module.scss';
import styles from './Header.module.scss';

export default function Header(): JSX.Element {
  const router = useRouter();

  const isCurrentPageIndex = router.asPath === '/';

  return (
    <header
      className={`${styles.wrapper} ${
        isCurrentPageIndex ? styles.hasMarginTop : ''
      }`}
    >
      <div className={commonStyles.container}>
        <Link href="/">
          <a>
            <img src="/logo.svg" alt="logo" />
          </a>
        </Link>
      </div>
    </header>
  );
}
