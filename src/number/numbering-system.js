define([
	"../common/cldr/main"
], function( cldrMain ) {

/**
 * NumberingSystem( cldr )
 *
 * TODO support ( native | traditional | finance ).
 */
return function( cldr ) {
	return cldrMain( cldr, "numbers/defaultNumberingSystem" );
};

});
