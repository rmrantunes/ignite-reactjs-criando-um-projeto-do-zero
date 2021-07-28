import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import styles from './PostLink.module.scss';

export type PostLinkProps = {
  title: string;
  subtitle: string;
  publishedAt: string;
  author: string;
  slug: string;
};

export function PostLink({
  title,
  subtitle,
  publishedAt,
  author,
  slug,
}: PostLinkProps): JSX.Element {
  return (
    <Link href={`/post/${slug}`}>
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
