define([
	"./format-message",
	"../util/array/for-each",
	"../util/object/keys"
], function( formatMessage, arrayForEach, objectKeys ) {

return function( code, message, attributes ) {
	var error;

	// Allow deferred-attributes.
	if ( typeof attributes === "function" ) {
		attributes = attributes();
	}

	message = code + ( message ? ": " + formatMessage( message, attributes ) : "" );
	error = new Error( message );
	error.code = code;

	// extend( error, attributes );
	arrayForEach( objectKeys( attributes ), function( attribute ) {
		error[ attribute ] = attributes[ attribute ];
	});

	return error;
};

});
