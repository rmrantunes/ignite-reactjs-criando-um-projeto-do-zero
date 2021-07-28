import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import styles from './PostLink.module.scss';

export type PostLinkProps = {
  title: string;
  subtitle: string;
  publishedAt: string;
  author: string;
  uid: string;
};

export function PostLink({
  title,
  subtitle,
  publishedAt,
  author,
  uid,
}: PostLinkProps): JSX.Element {
  return (
    <Link href={`/post/${uid}`}>
      <a className={styles.wrapper}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <div className={styles.footer}>
          <div>
            <FiCalendar />
            <span>{publishedAt}</span>
          </div>
          <div>
            <FiUser />
            <span>{author}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
