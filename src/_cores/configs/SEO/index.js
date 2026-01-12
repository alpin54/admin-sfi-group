// -- assets
// OGFacebookImage
import OGFacebookImage from '@assets/image/default/og-facebook.jpg';

// TwitterCardImage
import TwitterCardImage from '@assets/image/default/twitter-card.jpg';

// default icons imports
import appleIcon from '@assets/image/homescreen/apple-icon.png';
import favicon from '@assets/image/homescreen/favicon.ico';

// android & other devices icons imports
import favicon16 from '@assets/image/homescreen/favicon-16x16.png';
import favicon32 from '@assets/image/homescreen/favicon-32x32.png';
import favicon96 from '@assets/image/homescreen/favicon-96x96.png';
import favicon144 from '@assets/image/homescreen/android-icon-144x144.png';
import favicon192 from '@assets/image/homescreen/android-icon-192x192.png';

// Apple touch icons imports
import appleIcon57 from '@assets/image/homescreen/apple-icon-57x57.png';
import appleIcon60 from '@assets/image/homescreen/apple-icon-60x60.png';
import appleIcon72 from '@assets/image/homescreen/apple-icon-72x72.png';
import appleIcon76 from '@assets/image/homescreen/apple-icon-76x76.png';
import appleIcon114 from '@assets/image/homescreen/apple-icon-114x114.png';
import appleIcon120 from '@assets/image/homescreen/apple-icon-120x120.png';
import appleIcon144 from '@assets/image/homescreen/apple-icon-144x144.png';
import appleIcon152 from '@assets/image/homescreen/apple-icon-152x152.png';
import appleIcon180 from '@assets/image/homescreen/apple-icon-180x180.png';

const DefaultSEO = {
  title: 'SFI Group',
  description: 'SFI Group ',
  keywords: 'sfi group, sfi, ',
  timeRefresh: 900,
  siteName: 'SFI Group',
  siteDomain: 'sfi-group.id',
  siteURL: 'https://www.sfi-group.id',
  themeColor: '#0d0d2b',
  author: 'Arete Studio',
  copyright: '2025 SFI Group. All Right Reserved',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    enable: true,
    locale: 'en_US',
    type: 'website',
    image: OGFacebookImage.src
  },
  twitter: {
    enable: true,
    username: '@ecommerce_template_admin',
    card: 'summary_large_image',
    image: TwitterCardImage.src
  },
  manifest: '',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: true
  },
  icons: {
    android: {
      16: favicon16.src,
      32: favicon32.src,
      96: favicon96.src,
      144: favicon144.src,
      192: favicon192.src,
      default: favicon.src
    },
    apple: {
      57: appleIcon57.src,
      60: appleIcon60.src,
      72: appleIcon72.src,
      76: appleIcon76.src,
      114: appleIcon114.src,
      120: appleIcon120.src,
      144: appleIcon144.src,
      152: appleIcon152.src,
      180: appleIcon180.src,
      default: appleIcon.src
    }
  }
};

export default DefaultSEO;
