// -- config
import DefaultSchema from "@configs/schema";

// -- schemaDynamic
const schemaDynamic = (data) => {
	return {
		webpage: {
			url:
				DefaultSchema.webpage.url + data?.page ? data?.page.toLowerCase() : "",
			name: data?.page
				? data?.page + " | " + DefaultSchema.webpage.name
				: DefaultSchema.webpage.name,
		},
	};
};

export default schemaDynamic;
