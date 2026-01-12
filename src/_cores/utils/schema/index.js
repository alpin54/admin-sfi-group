// -- utils
import SchemaDefault from "@utils/schema/default";
import schemaDynamic from "@utils/schema/dynamic";

// -- Schema
const Schema = (() => {
	return {
		dynamic: schemaDynamic,
	};
})();

export { SchemaDefault };
export default Schema;
