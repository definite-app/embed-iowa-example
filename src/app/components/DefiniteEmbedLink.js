'use client';

import { useEffect, useState } from 'react';

export default function DefiniteEmbedLink({ embeddedUrl }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(embeddedUrl);
  }, [embeddedUrl]);

  return (
    <div>
      {url && (
        <iframe style={{ width: '100%', height: '100vh' }}
          src={url}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}