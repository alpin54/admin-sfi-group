// -- config
import DefaultSEO from '@configs/SEO';

// -- MetaTagDefault
const MetaTagDefault = () => {
  return (
    <>
      {/* -- core */}
      {/* <meta httpEquiv="refresh" content={DefaultSEO.timeRefresh} /> */}
      <meta httpEquiv='X-UA-Compatible' content='IE=9' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />

      {/* -- copyright */}
      <meta name='copyright' content={DefaultSEO.copyright} />

      {/* -- robots */}
      <meta
        name='googlebot-news'
        content={`${DefaultSEO.robots.index ? 'index' : 'noindex'}, ${
          DefaultSEO.robots.follow ? 'follow' : 'nofollow'
        }`}
      />
      <meta
        name='msnbot'
        content={`${DefaultSEO.robots.index ? 'index' : 'noindex'}, ${
          DefaultSEO.robots.follow ? 'follow' : 'nofollow'
        }`}
      />
      <meta
        name='webcrawlers'
        content={`${DefaultSEO.robots.index ? 'index' : 'noindex'}, ${
          DefaultSEO.robots.follow ? 'follow' : 'nofollow'
        }`}
      />
      <meta
        name='spiders'
        content={`${DefaultSEO.robots.index ? 'index' : 'noindex'}, ${
          DefaultSEO.robots.follow ? 'follow' : 'nofollow'
        }`}
      />
    </>
  );
};

export default MetaTagDefault;
