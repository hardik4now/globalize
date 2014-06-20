define([
	"cldr",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/presence",
	"./common/validate/type",
	"./common/validate/type/date",
	"./common/validate/type/date-pattern",
	"./common/validate/type/string",
	"./core",
	"./date/all-presets",
	"./date/expand-pattern",
	"./date/format",
	"./date/parse",
	"./util/always-array",
	"./util/array/some",
	"cldr/supplemental"
], function( Cldr, validateCldr, validateDefaultLocale, validatePresence, validateTypeDataType, validateTypeDate, validateTypeDatePattern, validateTypeString, Globalize, dateAllPresets, dateExpandPattern, dateFormat, dateParse, alwaysArray, arraySome ) {

/**
 * .formatDate( value, pattern )
 *
 * @value [Date]
 *
 * @pattern [String or Object] see date/expand_pattern for more info.
 *
 * Formats a date or number according to the given pattern string and the default/instance locale.
 */
Globalize.formatDate =
Globalize.prototype.formatDate = function( value, pattern ) {
	var cldr;

	validatePresence( value, "value" );
	validatePresence( pattern, "pattern" );
	validateTypeDate( value, "value" );
	validateTypeDatePattern( pattern, "pattern" );

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	try {
		pattern = dateExpandPattern( pattern, cldr );
		return dateFormat( value, pattern, cldr );
	} catch( error ) {
		throw validateCldr( error );
	}
};

/**
 * .parseDate( value, patterns )
 *
 * @value [String]
 *
 * @patterns [Array] Optional. See date/expand_pattern for more info about each pattern. Defaults to the list of all presets defined in the locale (see date/all_presets for more info).
 *
 * Return a Date instance or null.
 */
Globalize.parseDate =
Globalize.prototype.parseDate = function( value, patterns ) {
	var cldr, date;

	validatePresence( value, "value" );
	validateTypeString( value, "value" );

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	try {
		if ( !patterns ) {
			patterns = dateAllPresets( cldr );
		} else {
			patterns = alwaysArray( patterns );
		}

		arraySome( patterns, function( pattern ) {
			validateTypeDatePattern( pattern, "patterns" );
			pattern = dateExpandPattern( pattern, cldr );
			date = dateParse( value, pattern, cldr );
			return !!date;
		});

		return date || null;
	} catch( error ) {
		throw validateCldr( error );
	}
};

return Globalize;

});
