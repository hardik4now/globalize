define([
	"./core",
	"./duration/format",
	"./plural"
], function( Globalize, durationFormat ) {

/**
 * .formatDuration( value[, options] )
 *
 * @value [Date|Object]
 *
 * @options [Object]
 * - unit: [String] eg. "day", "week", "month", etc.
 *
 * Format duration ... TODO
 */
Globalize.formatDuration = function( value, options ) {

	// FIXME REMOVEME Public API. It's basically a wrapper orchestrating the private functions.

	return durationFormat( value, options, this.cldr, this );
};

return Globalize;

});
