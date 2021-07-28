import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';

import { PostLink } from '../components/PostLink';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './Home.module.scss';

interface Post {
  slug: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page?: string;
  results: Post[];
}

interface HomePageProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomePageProps): JSX.Element {
  return (
    <main className={commonStyles.container}>
      <nav className={styles.postLinkList}>
        {postsPagination.results.map(post => (
          <PostLink
            key={post.slug}
            author={post.data.author}
            title={post.data.title}
            subtitle={post.data.subtitle}
            slug={post.slug}
            publishedAt={post.first_publication_date}
          />
        ))}
      </nav>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    { fetch: ['post.title', 'post.subtitle', 'post.author'], pageSize: 8 }
  );

  const posts: Post[] = postsResponse.results.map(post => ({
    first_publication_date: new Date(
      post.first_publication_date
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    data: post.data,
    slug: post.uid,
  }));

  return {
    props: {
      postsPagination: { results: posts, next_page: postsResponse.next_page },
    },
  };
};
