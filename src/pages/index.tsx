import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import { PostLinkList, PostPagination } from '../components/PostLinkList';
import { getPostsPagination } from '../utils/posts-pagination';

interface HomePageProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomePageProps): JSX.Element {
  return (
    <main className={commonStyles.container}>
      <PostLinkList initialPostsPagination={postsPagination} />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    { fetch: ['post.title', 'post.subtitle', 'post.author'], pageSize: 1 }
  );

  return {
    props: {
      postsPagination: getPostsPagination(postsResponse),
    },
  };
};
