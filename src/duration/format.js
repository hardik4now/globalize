define([
	"../common/format-message"
], function( formatMessage ) {

/**
 * format( value, options, cldr, globalize )
 *
 * @value [Date|Object]
 *
 * @options [Object]
 * - unit: [String] eg. "day", "week", "month", etc.
 *
 * Format duration...
 */
return function( value, options, cldr, globalize ) {
	var format;
	options = options || {};

	// FIXME REMOVEME Impementation based on:
	// http://www.unicode.org/reports/tr35/tr35-dates.html#Calendar_Fields
	//
	// Feel free to create any helper function you judge necessary. They must all
	// live inside ./duration. Ideally, each file must hold one single function
	// for easy unit testing.

	format = {
		"one": "in {0} year",
		"other": "in {0} years"
	};

	return globalize.formatPlural( value, format );
};

});
