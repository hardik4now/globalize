define([
	"../create-error"
], function( createError ) {

return function( error ) {
	if ( error && error.code === "E_MISSING_CLDR_ITEM" ) {
		return createError( "E_MISSING_CLDR", "Missing required CLDR content `{path}`.", {
			path: error.path
		});
	}
	return error;
};

});
