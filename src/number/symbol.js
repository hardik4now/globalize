define([
	"./numbering-system",
	"../common/cldr/main"
], function( numberNumberingSystem, cldrMain ) {

/**
 * Symbol( name, cldr )
 *
 * @name [String] Symbol name.
 *
 * @cldr [Cldr instance].
 *
 * Return the localized symbol given its name.
 */
return function( name, cldr ) {
	return cldrMain( cldr, [
		"numbers/symbols-numberSystem-" + numberNumberingSystem( cldr ),
		name
	]);
};

});
