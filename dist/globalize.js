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
		define( [ "cldr" ], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "cldrjs" ) );
	} else {

		// Global
		root.Globalize = factory( root.Cldr );
	}
}( this, function( Cldr ) {


/**
 * A toString method that outputs meaningful values for objects or arrays and still performs as fast as a plain string in case variable is string, or as fast as `"" + number` in case variable is a number.
 * Ref: http://jsperf.com/my-stringify
 */
var toString = function( variable ) {
	return typeof variable === "string" ? variable : ( typeof variable === "number" ? "" + variable : ( JSON && JSON.stringify( variable ) || "" + variable ) );
};




/**
 * formatMessage( message, data )
 *
 * @message [String] A message with optional {vars} to be replaced.
 *
 * @data [Array or JSON] Object with replacing-variables content.
 *
 * Return the formatted message. For example:
 *
 * - formatMessage( "{0} second", 1 ); // 1 second
 *
 * - formatMessage( "{0}/{1}", ["m", "s"] ); // m/s
 *
 * - formatMessage( "{name} <{email}>", {
 *     name: "Foo",
 *     email: "bar@baz.qux"
 *   }); // Foo <bar@baz.qux>
 */
var formatMessage = function( message, data ) {

	// Replace {attribute}'s
	message = message.replace( /{[0-9a-zA-Z-_. ]+}/g, function( name ) {
		name = name.replace( /^{([^}]*)}$/, "$1" );
		return toString( data[ name ] );
	});

	return message;
};




var arrayForEach = function( array, callback ) {
	var i, length;
	if ( array.forEach ) {
		return array.forEach( callback );
	}
	for ( i = 0, length = array.length; i < length; i++ ) {
		callback( array[ i ], i, array );
	}
};




var objectKeys = function( object ) {
	var i,
		result = [];

	if ( Object.keys ) {
		return Object.keys( object );
	}

	for ( i in object ) {
		result.push( i );
	}

	return result;
};




var createError = function( code, message, attributes ) {
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




var validateCldr = function( error ) {
	if ( error && error.code === "E_MISSING_CLDR_ITEM" ) {
		return createError( "E_MISSING_CLDR", "Missing required CLDR content `{path}`.", {
			path: error.path
		});
	}
	return error;
};




var validate = function( code, message, check, attributes ) {
	if ( !check ) {
		throw createError( code, message, attributes );
	}
};




var validateDefaultLocale = function( value ) {
	validate( "E_DEFAULT_LOCALE_NOT_DEFINED", "Default locale has not been defined.", typeof value !== "undefined", {} );
};




var validatePresence = function( value, name ) {
	validate( "E_MISSING_PARAMETER", "Missing required parameter `{name}`.", typeof value !== "undefined", {
		name: name
	});
};




var validateType = function( value, name, check, expected ) {
	validate( "E_INVALID_PAR_TYPE", "Invalid `{name}` parameter ({value}). {expected} expected.", check, {
		expected: expected,
		name: name,
		value: value
	});
};




var validateTypeLocale = function( value, name ) {
	validateType( value, name, typeof value === "undefined" || typeof value === "string" || value instanceof Cldr, "String or Cldr instance" );
};




/**
 * Function inspired by jQuery Core, but reduced to our use case.
 */
var isPlainObject = function( obj ) {
	return obj !== null && "" + obj === "[object Object]";
};




var validateTypePlainObject = function( value, name ) {
	validateType( value, name, typeof value === "undefined" || isPlainObject( value ), "Plain Object" );
};




var alwaysCldr = function( localeOrCldr ) {
	return localeOrCldr instanceof Cldr ? localeOrCldr : new Cldr( localeOrCldr );
};




function validateLikelySubtags( cldr ) {
	try {
		cldr.get( "supplemental/likelySubtags", { throw: true });
	} catch( error ) {
		throw validateCldr( error );
	}
}

/**
 * [new] Globalize( locale|cldr )
 *
 * @locale [String]
 *
 * @cldr [Cldr instance]
 *
 * Create a Globalize instance.
 */
function Globalize( locale ) {
	if ( !( this instanceof Globalize ) ) {
		return new Globalize( locale );
	}

	validatePresence( locale, "locale" );
	validateTypeLocale( locale, "locale" );

	this.cldr = alwaysCldr( locale );

	validateLikelySubtags( this.cldr );
}

/**
 * Globalize.load( json )
 *
 * @json [JSON]
 *
 * Load resolved or unresolved cldr data.
 * Somewhat equivalent to previous Globalize.addCultureInfo(...).
 */
Globalize.load = function( json ) {
	validatePresence( json, "json" );
	validateTypePlainObject( json, "json" );

	Cldr.load( json );
};

/**
 * Globalize.locale( [locale|cldr] )
 *
 * @locale [String]
 *
 * @cldr [Cldr instance]
 *
 * Set default Cldr instance if locale or cldr argument is passed.
 *
 * Return the default Cldr instance.
 */
Globalize.locale = function( locale ) {
	validateTypeLocale( locale, "locale" );

	if ( arguments.length ) {
		this.cldr = alwaysCldr( locale );
		validateLikelySubtags( this.cldr );
	}
	return this.cldr;
};

/**
 * Optimization to avoid duplicating some internal functions across modules.
 */
Globalize._createError = createError;
Globalize._formatMessage = formatMessage;
Globalize._isPlainObject = isPlainObject;
Globalize._objectKeys = objectKeys;
Globalize._validateCldr = validateCldr;
Globalize._validateDefaultLocale = validateDefaultLocale;
Globalize._validatePresence = validatePresence;
Globalize._validateTypePlainObject = validateTypePlainObject;
Globalize._validateType = validateType;

return Globalize;




}));
