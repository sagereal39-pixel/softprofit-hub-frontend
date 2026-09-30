import React, { useEffect } from 'react';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

function SitemapPage() {
  useEffect(() => {
    window.location.href = `${BASE_URL}/sitemap.php`;
  }, []);
  return <p>Redirecting to sitemap...</p>;
}

export default SitemapPage;