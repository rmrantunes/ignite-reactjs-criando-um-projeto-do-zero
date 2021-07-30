import Link from 'next/link';

import commonStyles from '../../styles/common.module.scss';
import { ExitPreviewModeButton } from '../ExitPreviewModeButton';
import styles from './Header.module.scss';

interface HeaderProps {
  isCurrentPageIndex?: boolean;
  isPreview: boolean;
}

export default function Header({
  isCurrentPageIndex,
  isPreview,
}: HeaderProps): JSX.Element {
  return (
    <header
      className={`${styles.wrapper} ${
        isCurrentPageIndex ? styles.hasMarginTop : ''
      }`}
    >
      <div className={`${commonStyles.container} ${styles.container}`}>
        <Link href="/">
          <a>
            <img src="/logo.svg" alt="logo" />
          </a>
        </Link>

        {isPreview && <ExitPreviewModeButton />}
      </div>
    </header>
  );
}
