import Link from 'next/link';

import styles from './ExitPreviewModeButton.module.scss';

export function ExitPreviewModeButton(): JSX.Element {
  return (
    <Link href="/api/exit-preview">
      <a className={styles.exitPreviewModeLink}>Exit Preview Mode</a>
    </Link>
  );
}
