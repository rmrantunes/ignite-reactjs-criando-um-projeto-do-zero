import Prismic from '@prismicio/client';
import ApiSearchResponse from '@prismicio/client/types/ApiSearchResponse';
import { DefaultClient } from '@prismicio/client/types/client';
import { Post, PostPagination } from '../components/PostLinkList';

export function getPostsPagination(
  prismicResponse: ApiSearchResponse
): PostPagination {
  const posts: Post[] = prismicResponse.results.map(post => ({
    first_publication_date: post.first_publication_date,
    data: post.data,
    uid: post.uid,
  }));

  return { results: posts, next_page: prismicResponse.next_page };
}

export async function loadMorePosts(
  nextPostsPage: string
): Promise<PostPagination> {
  const response = await fetch(nextPostsPage);
  const prismicResponse = await response.json();

  return getPostsPagination(prismicResponse);
}

export type NextPreviousPosts = {
  previousPost?: null | {
    uid: string;
    title: string;
  };

  nextPost?: null | {
    uid: string;
    title: string;
  };
};

export async function getNextPreviousPosts(
  prismicClient: DefaultClient,
  currentPostId: string
): Promise<NextPreviousPosts> {
  const olderPostResponse = await prismicClient.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      pageSize: 1,
      after: currentPostId,
      orderings: '[document.first_publication_date desc]',
      fetch: ['post.title'],
    }
  );

  const newerPostResponse = await prismicClient.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      pageSize: 1,
      after: currentPostId,
      orderings: '[document.first_publication_date]',
      fetch: ['post.title'],
    }
  );

  const nextPost = olderPostResponse.results?.[0]
    ? {
        uid: olderPostResponse.results[0]?.uid || null,
        title: olderPostResponse.results[0].data.title,
      }
    : null;

  const previousPost = newerPostResponse.results?.[0]
    ? {
        uid: newerPostResponse.results[0]?.uid || null,
        title: newerPostResponse.results[0].data.title,
      }
    : null;

  return { previousPost, nextPost };
}
