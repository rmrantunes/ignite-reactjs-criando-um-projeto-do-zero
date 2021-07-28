import { useCallback, useState } from 'react';

import { loadMorePosts } from '../../utils/posts-pagination';
import { PostLink } from '../PostLink';
import styles from './PostLinkList.module.scss';

export interface Post {
  uid: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

export interface PostPagination {
  next_page?: string;
  results: Post[];
}

interface PostLinkListProps {
  initialPostsPagination: PostPagination;
}

export function PostLinkList({
  initialPostsPagination,
}: PostLinkListProps): JSX.Element {
  const [postsPagination, setPostsPagination] = useState(
    initialPostsPagination
  );

  const handleLoadMorePosts = useCallback(async () => {
    if (!postsPagination.next_page) return;

    const newPostsPagination = await loadMorePosts(postsPagination.next_page);
    setPostsPagination(state => ({
      next_page: newPostsPagination.next_page,
      results: [...state.results, ...newPostsPagination.results],
    }));
  }, [postsPagination.next_page]);

  return (
    <nav className={styles.postLinkList}>
      {postsPagination.results.map(post => (
        <PostLink
          key={post.uid}
          author={post.data.author}
          title={post.data.title}
          subtitle={post.data.subtitle}
          uid={post.uid}
          publishedAt={post.first_publication_date}
        />
      ))}
      {postsPagination.next_page && (
        <button
          type="button"
          className={styles.loadMorePostsButton}
          onClick={handleLoadMorePosts}
        >
          Carregar mais posts
        </button>
      )}
    </nav>
  );
}
