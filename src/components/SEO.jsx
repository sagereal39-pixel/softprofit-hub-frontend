import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author = 'Softprofit Hub',
}) {
  const siteName = 'Softprofit Hub';
  const defaultDescription =
    'Your trusted guide to the best digital products, tools and software on the internet.';
  // Use the real deployed URL (set REACT_APP_SITE_URL once a custom domain exists)
  const siteUrl =
    process.env.REACT_APP_SITE_URL || 'https://softprofit-hub-frontend.vercel.app';

  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDesc = description || defaultDescription;
  const metaImage = image || null; // omit og:image entirely rather than risk a dead external link
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph — Facebook, WhatsApp, LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      {metaImage && <meta property="og:image" content={metaImage} />}
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      {metaImage && <meta name="twitter:image" content={metaImage} />}
      <meta name="twitter:site" content="@softprofithub" />

      {/* Article specific */}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
    </Helmet>
  );
}

export default SEO;