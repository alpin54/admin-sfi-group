// -- config
import DefaultSEO from "@configs/SEO";

// -- utils
import metaTagIcons from "@utils/metaTag/data/icons";

// -- assets
import msIcon from "@assets/image/homescreen/ms-icon-144x144.png";

// -- metaTagData
const metaTagData = () => {
	const metadataBase = new URL(
		process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
	);

	return {
		authors: [
			{
				name: DefaultSEO.author,
			},
		],
		robots: {
			...DefaultSEO.robots,
			googleBot: {
				...DefaultSEO.robots,
			},
		},
		manifest: DefaultSEO.manifest,
		icons: metaTagIcons(),
		other: {
			// -- android add to home screen
			"application-name": DefaultSEO.siteName,
			"mobile-web-app-capable": DefaultSEO.siteCapable ? "yes" : "no",

			// -- windows microsoft
			"msapplication-TileColor": DefaultSEO.themeColor,
			"msapplication-TileImage": new URL(msIcon.src, metadataBase).toString(),

			// -- apple add to home screen
			"apple-mobile-web-app-title": DefaultSEO.siteName,
			"apple-mobile-web-app-capable": DefaultSEO.siteCapable ? "yes" : "no",
			"apple-mobile-web-app-status-bar-style": DefaultSEO.themeColor,
		},
	};
};

export default metaTagData;
