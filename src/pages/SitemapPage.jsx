import React, { useEffect } from 'react';

function SitemapPage() {
  useEffect(() => {
    window.location.href = 'http://localhost:5001/api/sitemap.php';
  }, []);
  return <p>Redirecting to sitemap...</p>;
}

export default SitemapPage;
