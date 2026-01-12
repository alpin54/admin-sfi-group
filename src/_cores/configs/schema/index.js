// --- DefaultSchema
const DefaultSchema = {
  organization: {
    context: 'http://schema.org',
    id: 'https://sfi-group.id#organization',
    type: 'Organization',
    name: 'SFI Group',
    url: 'https://sfi-group.id',
    logo: 'https://sfi-group.id/logo/logo-primary.png',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+62-81380003385',
        contactType: 'sales',
        areaServed: 'ID'
      }
    ],
    sameAs: [
      'https://www.instagram.com/sfi-group',
      'https://www.facebook.com/sfi-group',
      'https://www.tiktok.com/@sfi-group'
    ]
  },
  website: {
    context: 'http://schema.org',
    id: 'https://sfi-group.id#website',
    type: 'WebSite',
    url: 'https://sfi-group.id',
    name: 'SFI Group'
  },
  webpage: {
    context: 'http://schema.org',
    id: 'https://sfi-group.id#webpage',
    type: 'WebPage',
    url: 'https://sfi-group.id',
    name: 'SFI Group'
  }
};

export default DefaultSchema;
