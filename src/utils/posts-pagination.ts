import ApiSearchResponse from '@prismicio/client/types/ApiSearchResponse';
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
