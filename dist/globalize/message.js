/*!
 * Globalize v1.0.0-alpha.3
 *
 * http://github.com/jquery/globalize
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-06-20T00:49Z
 */
(function( root, factory ) {

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define( [ "cldr", "../globalize" ], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "cldrjs" ), require( "globalize" ) );
	} else {

		// Extend global
		factory( root.Cldr, root.Globalize );
	}
}(this, function( Cldr, Globalize ) {

var validateDefaultLocale = Globalize._validateDefaultLocale,
	validatePresence = Globalize._validatePresence,
	validateType = Globalize._validateType,
	validateTypePlainObject = Globalize._validateTypePlainObject;


var cldrGet = function( cldr, path ) {
	return cldr.get( path, { throw: true } );
};




var arrayIsArray = Array.isArray || function( obj ) {
	return Object.prototype.toString.call( obj ) === "[object Array]";
};




var alwaysArray = function( stringOrArray ) {
	return arrayIsArray( stringOrArray ) ?  stringOrArray : [ stringOrArray ];
};




/**
 * .loadTranslations( json )
 *
 * @json [JSON]
 *
 * Load translation data.
 */
Globalize.loadTranslations = function( json ) {
	var customData = {
		"globalize-translations": json
	};

	validatePresence( json, "json" );
	validateTypePlainObject( json, "json" );

	Cldr.load( customData );
};

/**
 * .translate( path )
 *
 * @path [String or Array]
 *
 * Translate item given its path.
 */
Globalize.translate =
Globalize.prototype.translate = function( path ) {
	var cldr;

	validatePresence( path, "path" );
	validateType( path, "path", typeof path === "string" || arrayIsArray( path ), "a String nor an Array");

	path = alwaysArray( path );
	cldr = this.cldr;

	validateDefaultLocale( cldr );

	return cldrGet( cldr, [ "globalize-translations/{languageId}" ].concat( path ) );
};

return Globalize;




}));
