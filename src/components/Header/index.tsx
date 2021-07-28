import Link from 'next/link';

import commonStyles from '../../styles/common.module.scss';
import styles from './Header.module.scss';

interface HeaderProps {
  isCurrentPageIndex?: boolean;
}

export default function Header({
  isCurrentPageIndex,
}: HeaderProps): JSX.Element {
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
