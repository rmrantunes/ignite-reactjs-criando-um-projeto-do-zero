import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import { Label } from '../../components/Label';
import { PostBanner } from '../../components/PostBanner';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  reading_duration: string;
  data: {
    title: string;
    banner: {
      url: string;
      alt: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      };
    }[];
  };
}

interface PostPageProps {
  post: Post;
}

export default function Post({ post }: PostPageProps): JSX.Element {
  return (
    <main>
      <PostBanner alt={post.data.banner.alt} imageUrl={post.data.banner.url} />
      <article className={`${commonStyles.container} ${styles.postWrapper}`}>
        <div>
          <h1 className={styles.postTitle}>{post.data.title}</h1>
          <div className={styles.postMetadata}>
            <Label icon={<FiCalendar />}>{post.first_publication_date}</Label>
            <Label icon={<FiUser />}>{post.data.author}</Label>
            <Label icon={<FiClock />}>{post.reading_duration}</Label>
          </div>
        </div>
        {post.data.content.map(section => (
          <div key={section.heading}>
            <h2 className={styles.postContentTitle}>{section.heading}</h2>
            <div
              className={styles.postContentBody}
              dangerouslySetInnerHTML={{
                __html: section.body.text,
              }}
            />
          </div>
        ))}
      </article>
    </main>
  );
}

function getPostWordsAmount(content: any[]): number {
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
    : `~ ${Math.ceil(aproxReadingDurationInMinutes)} min`;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);

  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', params.slug as string, {});

  const postWordsAmount = getPostWordsAmount(response.data.content);
  const aproxReadingDuration = getAproxReadingDuration(postWordsAmount);

  const post: Post = {
    data: {
      ...response.data,
      content: response.data.content.map(section => ({
        heading: section.heading,
        body: { text: RichText.asHtml(section.body) },
      })),
    },
    first_publication_date: new Date(
      response.first_publication_date
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    reading_duration: aproxReadingDuration,
  };

  return { props: { post } };
};
