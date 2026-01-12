const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_MEMBER_URL = process.env.NEXT_PUBLIC_API_MEMBER_BASE_URL;

const ENDPOINT = {
  // AUTH
  LOGIN: `${API_URL}/login`,

  // USERS MANAGEMENT
  // - USERS
  USERS: `${API_URL}/users`,
  USER_LOG: `${API_URL}/user-logs`,

  // - USERS ROLES
  ROLES: `${API_URL}/roles`,
  ROLEMENU: `${API_URL}/role/menus`,

  // PRODUCT`
  PRODUCTS: `${API_URL}/products`,
  PRODUCT_CATEGORIES: `${API_URL}/categories`,
  PRODUCT_CATEGORIES_TREE: `${API_URL}/categories/tree`,
  PRODUCT_SUB_CATEGORIES: `${API_URL}/subcategories`,
  PRODUCT_COLORS: `${API_URL}/colors`,
  PRODUCT_MATERIALS: `${API_URL}/materials`,
  PRODUCT_COLLECTIONS: `${API_URL}/collections`,
  PRODUCT_SIZES: `${API_URL}/sizes`,

  // PAGES
  // - TERMS & CONDITIONS
  TERMS_CONDITIONS: `${API_URL}/terms-conditions`,

  // - ABOUT US
  ABOUT_BANNER: `${API_URL}/about/banner`,
  ABOUT_OUR_MISSION: `${API_URL}/about/our-mission`,
  ABOUT_OUR_VALUES: `${API_URL}/about/our-values`,
  ABOUT_VALUES: `${API_URL}/about/values`,
  ABOUT_SECTION_DESCRIPTION: `${API_URL}/about/section-description`,
  ABOUT_OUR_STORY: `${API_URL}/about/our-story`,

  // - HOME
  // -- HERO BANNER
  HOME_BANNER: `${API_URL}/home/banner`,
  HOME_BANNER_SECTION: `${API_URL}/home/banner/section`,
  // -- FEATURED CATEGORIES
  HOME_FEATURED_CATEGORIES: `${API_URL}/home/featured-categories`,
  HOME_FEATURED_CATEGORIES_SECTION: `${API_URL}/home/featured-categories/section`,
  // -- FEATURED PRODUCTS
  HOME_FEATURED_PRODUCTS: `${API_URL}/home/featured-products`,
  HOME_FEATURED_PRODUCTS_SECTION: `${API_URL}/home/featured-products/section`,
  // -- SECTION IMAGE
  HOME_SECTION_IMAGE: `${API_URL}/home/section-image`,
  // -- HIGHLIGHTS
  HOME_HIGHLIGHTS: `${API_URL}/home/highlights`,
  HOME_HIGHLIGHTS_SECTION: `${API_URL}/home/highlights/section`,
  // -- CTA
  HOME_CTA: `${API_URL}/home/cta`,
  // SHIPPING & RETURN
  SHIPPING_RETURN: `${API_URL}/shipping-return`,
  // NOT FOUND
  NOTFOUND: `${API_URL}/not-found`,
  // MAINTENANCE
  MAINTENANCE: `${API_URL}/maintenance`,

  // SIGN IN
  SIGNINBANNER: `${API_URL}/sign-in/banner`,
  SIGNINTEXT: `${API_URL}/sign-in/about`,
  FORGOTBANNER: `${API_URL}/forgot-password/banner`,
  FORGOTTEXT: `${API_URL}/forgot-password/about`,
  NEWPASSWORDBANNER: `${API_URL}/new-password/banner`,
  NEWPASSWORDTEXT: `${API_URL}/new-password/about`,
  SIGNUPBANNER: `${API_URL}/sign-up/banner`,
  SIGNUPTEXT: `${API_URL}/sign-up/about`,
  SENDEMAILBANNER: `${API_URL}/send-email/banner`,
  SENDEMAILTEXT: `${API_URL}/send-email/about`,
  SENDINSTRUCTIONSBANNER: `${API_URL}/send-instructions/banner`,
  SENDINSTRUCTIONSTEXT: `${API_URL}/send-instructions/about`,
  VERIFICATIONEMAILBANNER: `${API_URL}/verification-email/banner`,
  VERIFICATIONEMAILTEXT: `${API_URL}/verification-email/about`,
  SUCCESSCREATEBANNER: `${API_URL}/success-create/banner`,
  SUCCESSCREATETEXT: `${API_URL}/success-create/about`,

  // CAREER PAGE
  CAREER_TITLE: `${API_URL}/career/title`,
  CAREER_BANNER: `${API_URL}/career/banner`,
  CAREER_EMPTY: `${API_URL}/career/empty`,

  // CAREER LIST DATA
  CAREERS: `${API_URL}/career`,
  CAREERS_SUMMARY: `${API_URL}/career/summary`,
  CAREERS_WORKPLACE_TYPES: `${API_URL}/career-workplace-types`,
  CAREERS_JOB_TYPE: `${API_URL}/career-job-type`,
  CAREERS_APPLY: `${API_URL}/career-apply`,
  CAREERS_APPLY_SUMMARY: `${API_URL}/career-apply/summary`,

  // CONTACT US
  CONTACT_US: `${API_URL}/contact-us`,
  CONTACT_US_ITEM: `${API_URL}/contact-us/item`,
  CONTACT_US_INFO: `${API_URL}/contact-us/info`,
  CONTACT_US_FORM: `${API_URL}/contact-us/form`,

  // META
  META: `${API_URL}/meta`,

  // FOOTER
  FOOTER: `${API_URL}/footer`,
  FOOTER_MENU: `${API_URL}/footer/menu`,
  FOOTER_SOSMED: `${API_URL}/footer/sosmed`,

  // FAQ
  FAQ_TITLE: `${API_URL}/faq/title`,
  FAQ_EMPTY: `${API_URL}/faq/empty`,
  FAQ_ITEM: `${API_URL}/faq/item`,

  // EMAIL TEMPLATE
  EMAIL_TEMPLATE: `${API_URL}/email-template`,

  // SUBSCRIBE
  SUBSCRIBE: `${API_URL}/subscribe`,
  SUBSCRIBE_SUMMARY: `${API_URL}/subscribe-summary`,
  SUBSCRIBE_DOWNLOAD: `${API_MEMBER_URL}/subscribe/download`,

  // FORM SUBMISSION
  FORM_SUBMISSION: `${API_URL}/contact-us/form`,
  FORM_SUBMISSION_SUMMARY: `${API_URL}/contact-us/form/summary`,

  // MEMBER
  MEMBER: `${API_URL}/member`,

  // ORDERS
  ORDERS: `${API_URL}/orders`,
  ORDER_SUMMARY: `${API_URL}/order/summary`,

  // DASHBOARD
  DASHBOARD_WIDGET_ORDER: `${API_URL}/widget-order`,
  DASHBOARD_CHART_WEEKLY: `${API_URL}/chart-weekly`,
  DASHBOARD_RECENT_ORDER: `${API_URL}/recent-order`,
  DASHBOARD_TOP_MEMBER: `${API_URL}/top-member`,
  DASHBOARD_TOP_PRODUCT: `${API_URL}/top-product`,
  DASHBOARD_TOP_PAGE: `${API_URL}/top-page`,
  DASHBOARD_CHART_CUSTOMER: `${API_URL}/chart-customer`,

  // REVENUE
  REVENUE: `${API_URL}/revenue`,
  REVENUE_SUMMARY: `${API_URL}/revenue/summary`,

  // VOUCHERS
  VOUCHERS: `${API_URL}/vouchers`,
  VOUCHERS_USAGE: `${API_URL}/vouchers/usage`
};

export default ENDPOINT;
