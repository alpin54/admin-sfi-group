// -- config
import DefaultSchema from "@configs/schema";

// -- SchemaDefault
const SchemaDefault = () => {
	return (
		<>
			{/* Schema Organization */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": DefaultSchema.organization.context,
						"@id": DefaultSchema.organization.id,
						"@type": DefaultSchema.organization.type,
						name: DefaultSchema.organization.name,
						url: DefaultSchema.organization.url,
						logo: DefaultSchema.organization.logo,
						contactPoint: DefaultSchema.organization.contactPoint,
						sameAs: DefaultSchema.sameAs,
					}),
				}}
			></script>

			{/* Schema Website */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": DefaultSchema.website.context,
						"@id": DefaultSchema.website.id,
						"@type": DefaultSchema.website.type,
						url: DefaultSchema.website.url,
						name: DefaultSchema.website.name,
					}),
				}}
			></script>

			{/* Schema WebPage */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": DefaultSchema.webpage.context,
						"@id": DefaultSchema.webpage.id,
						"@type": DefaultSchema.webpage.type,
						url: DefaultSchema.webpage.url,
						name: DefaultSchema.webpage.name,
					}),
				}}
			></script>
		</>
	);
};

export default SchemaDefault;
