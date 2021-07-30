import Link from 'next/link';
import { NextPreviousPosts } from '../../utils/posts-pagination';

import styles from './NextPreviousPostsNav.module.scss';

type NextPreviousPostsProps = {
  nextPreviousPosts: NextPreviousPosts;
};

export function NextPreviousPostsNav({
  nextPreviousPosts,
}: NextPreviousPostsProps): JSX.Element {
  return (
    <>
      <hr className={styles.divider} />
      <nav className={styles.nextPreviousPostsNav}>
        {nextPreviousPosts.previousPost && (
          <Link href={`/post/${nextPreviousPosts.previousPost.uid}`}>
            <a className={styles.nextPreviousPostsLink}>
              <span>{nextPreviousPosts.previousPost.title}</span>
              <strong>Post anterior</strong>
            </a>
          </Link>
        )}

        {nextPreviousPosts.nextPost && (
          <Link href={`/post/${nextPreviousPosts.nextPost.uid}`}>
            <a className={`${styles.nextPreviousPostsLink} ${styles.next}`}>
              <span>{nextPreviousPosts.nextPost.title}</span>
              <strong>Próximo post</strong>
            </a>
          </Link>
        )}
      </nav>
    </>
  );
}
