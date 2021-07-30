import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

interface UseUpdatePreviewRefInput {
  isPreview: boolean;
  preview: {
    activeRef: string;
  };
  documentId: string;
}

export function useUpdatePreviewRef({
  isPreview,
  preview,
  documentId,
}: UseUpdatePreviewRefInput): void {
  const router = useRouter();

  useEffect((): void => {
    if (isPreview) {
      const rawPreviewCookie = Cookies.get('io.prismic.preview');

      if (!rawPreviewCookie) {
        router.push('/api/exit-preview');
        return;
      }

      const previewCookie = JSON.parse(rawPreviewCookie);
      const previewCookieObject =
        previewCookie['spacetraveling-rmra.prismic.io'];
      const previewCookieRef = previewCookieObject?.preview ?? null;

      if (previewCookieRef && preview.activeRef !== previewCookieRef) {
        router.push(
          `/api/preview?token=${previewCookieRef}&documentId=${documentId}`
        );
      }
    }
  }, []);
}
