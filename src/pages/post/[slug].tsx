import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { useRouter } from 'next/router';

import { Label } from '../../components/Label';
import { PostBanner } from '../../components/PostBanner';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { formatDate } from '../../utils/format';
import { UtterancesCommentsSection } from '../../components/UtterancesCommentsSection';
import { useUpdatePreviewRef } from '../../hooks/useUpdatePreviewRef';

interface Post {
  first_publication_date: string | null;
  uid?: string;
  id?: string;
  data: {
    title: string;
    banner: {
      url: string;
      alt?: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostPageProps {
  post: Post;
  isPreview: boolean;
  preview: {
    activeRef: string;
  };
}

function getPostWordsAmount(content: Post['data']['content']): number {
  const ALL_SPACES_REGEX = /\s+/g;

  return content.reduce((sum: number, section) => {
    const headingWordsAmount = section.heading
      ? section.heading?.split(ALL_SPACES_REGEX).length
      : 0;

    const bodyWordsAmount = RichText.asText(section.body).split(
      ALL_SPACES_REGEX
    ).length;

    return headingWordsAmount + bodyWordsAmount + sum;
  }, 0);
}

function getAproxReadingDuration(
  wordsAmount: number,
  wordsPerMinute = 200
): string {
  const aproxReadingDurationInMinutes = wordsAmount / wordsPerMinute;
  return aproxReadingDurationInMinutes < 1
    ? '< 1 min'
    : `${Math.ceil(aproxReadingDurationInMinutes)} min`;
}

export default function Post({
  post,
  isPreview,
  preview,
}: PostPageProps): JSX.Element {
  const router = useRouter();
  useUpdatePreviewRef({
    documentId: post.id,
    isPreview,
    preview,
  });

  const aproxReadingDuration = getAproxReadingDuration(
    getPostWordsAmount(post.data.content)
  );

  return router.isFallback ? (
    <p>Carregando...</p>
  ) : (
    <main>
      <PostBanner alt={post.data.banner.alt} imageUrl={post.data.banner.url} />
      <article className={`${commonStyles.container} ${styles.postWrapper}`}>
        <div>
          <h1 className={styles.postTitle}>{post.data.title}</h1>
          <div className={styles.postMetadata}>
            <Label icon={<FiCalendar />}>
              {formatDate(new Date(post.first_publication_date))}
            </Label>
            <Label icon={<FiUser />}>{post.data.author}</Label>
            <Label icon={<FiClock />}>{aproxReadingDuration}</Label>
          </div>
        </div>
        {post.data.content.map(section => (
          <div key={section.heading}>
            <h2 className={styles.postContentTitle}>{section.heading}</h2>
            <div
              className={styles.postContentBody}
              dangerouslySetInnerHTML={{
                __html: RichText.asHtml(section.body),
              }}
            />
          </div>
        ))}
      </article>

      <UtterancesCommentsSection />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    { fetch: [''], pageSize: 8 }
  );

  const paths = postsResponse.results.map(({ uid }) => ({
    params: { slug: uid },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const activeRef = previewData ? previewData.ref : null;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', params.slug as string, {
    ref: activeRef,
  });

  const post: Post = {
    data: {
      ...response.data,
      content: response.data.content.map(section => ({
        heading: section.heading,
        body: section.body,
      })),
    },
    uid: response.uid,
    id: response.id,
    first_publication_date: response.first_publication_date,
  };

  return { props: { post, preview: { activeRef }, isPreview: preview } };
};
