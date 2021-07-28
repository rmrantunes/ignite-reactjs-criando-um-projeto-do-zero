import { useEffect, useRef } from 'react';

export function UtterancesCommentsSection(): JSX.Element {
  const scriptRef = useRef<HTMLScriptElement>(null);

  useEffect(() => {
    scriptRef.current.setAttribute(
      'repo',
      'rmrantunes/spacetraveling-comments'
    );
    scriptRef.current.setAttribute('issue-term', 'pathname');
    scriptRef.current.setAttribute('src', 'https://utteranc.es/client.js');
    scriptRef.current.setAttribute('theme', 'github-dark');
    scriptRef.current.setAttribute('crossorigin', 'anonymous');
  }, []);

  return <script ref={scriptRef} async />;
}
