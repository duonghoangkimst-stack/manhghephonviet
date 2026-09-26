import React from 'react';
import { Helmet } from 'react-helmet-async'; // hoặc 'react-helmet'

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "Mảnh Ghép Hồn Việt",
  description = "Khám phá câu chuyện di sản và lịch sử Việt Nam.",
  canonical,
  ogImage,
  ogType = "website",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
    </Helmet>
  );
};

export default SEO;