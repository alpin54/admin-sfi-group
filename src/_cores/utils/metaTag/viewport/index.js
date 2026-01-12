// -- config
import DefaultSEO from "@configs/SEO";

// -- metaTagViewport
const metaTagViewport = () => {
	return {
		...DefaultSEO.viewport,
		themeColor: DefaultSEO.themeColor,
	};
};

export default metaTagViewport;
