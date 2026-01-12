// -- configs
import DefaultSEO from '@configs/SEO';

const metaTagDynamic = (data = {}) => {
  const metadataBase = new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');

  // Extract defaults from DefaultSEO
  const { title, description, keywords, siteURL, openGraph, twitter } = DefaultSEO;
  const pageTitle = data.page ? `${data.page} | ${title}` : title;
  const pageDescription = data.page ? `${data.page} | ${description}` : description;
  const pageKeywords = data.page ? `${data.page} | ${keywords}` : keywords;
  const pageUrl = new URL(data.link || '', siteURL).toString();

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    metadataBase,
    alternates: {
      canonical: pageUrl
    },
    ...(openGraph.enable && {
      openGraph: {
        locale: openGraph.locale,
        type: openGraph.type,
        siteName: DefaultSEO.siteName,
        title: pageTitle,
        description: pageDescription,
        url: new URL(data.link || '', metadataBase).toString(),
        images: [
          {
            url: new URL(data.ogImage || openGraph.image, metadataBase).toString(),
            alt: data.title || title
          }
        ]
      }
    }),
    ...(twitter.enable && {
      twitter: {
        card: twitter.card,
        site: twitter.username,
        siteId: twitter.username,
        creator: twitter.username,
        title: pageTitle,
        description: pageDescription,
        images: [new URL(data.twitterImage || twitter.image, metadataBase).toString()]
      }
    })
  };
};

export default metaTagDynamic;
