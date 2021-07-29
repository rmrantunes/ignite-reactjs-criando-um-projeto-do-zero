import { useEffect } from 'react';

export function UtterancesCommentsSection(): JSX.Element {
  useEffect(() => {
    const anchor = document.getElementById('utterances-comment-section');
    const script = document.createElement('script');
    script.setAttribute('repo', 'rmrantunes/spacetraveling-comments');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('theme', 'github-dark');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    anchor.appendChild(script);
  }, []);

  return <div id="utterances-comment-section" />;
}
