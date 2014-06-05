define(function() {

return function( cldr, path ) {
	return cldr.get( path, { throw: true } );
};

});
