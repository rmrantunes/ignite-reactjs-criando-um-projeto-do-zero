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
    <>
      <main className={commonStyles.container}>
        <PostLinkList initialPostsPagination={postsPagination} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  preview = false,
  previewData,
}) => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 1,
      ref: previewData?.ref ?? null,
    }
  );

  return {
    props: {
      postsPagination: getPostsPagination(postsResponse),
      isPreview: preview,
    },
    revalidate: 60 * 15, // 15 minutes
  };
};
