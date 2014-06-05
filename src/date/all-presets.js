define([
	"../common/cldr/main",
	"../common/format-message",
	"../util/array/map",
	"../util/object/values"
], function( cldrMain, formatMessage, arrayMap, objectValues ) {

/**
 * allPreset()
 *
 * @cldr [Cldr instance].
 *
 * Return an Array with all (skeleton, date, time, datetime) presets.
 */
return function( cldr ) {
	var result = [];

	// Skeleton
	result = objectValues( cldrMain( cldr, "dates/calendars/gregorian/dateTimeFormats/availableFormats" ) );

	// Time
	result = result.concat( objectValues( cldrMain( cldr, "dates/calendars/gregorian/timeFormats" ) ) );

	// Date
	result = result.concat( objectValues( cldrMain( cldr, "dates/calendars/gregorian/dateFormats" ) ) );

	// Datetime
	result = result.concat( arrayMap( objectValues( cldrMain( cldr, "dates/calendars/gregorian/dateTimeFormats" ) ), function( datetimeFormat, key ) {
		if ( typeof datetimeFormat !== "string" ) {
			return datetimeFormat;
		}
		return formatMessage( datetimeFormat, [
			cldrMain( cldr, [
				"dates/calendars/gregorian/timeFormats",
				key
			]),
			cldrMain( cldr, [
				"dates/calendars/gregorian/dateFormats",
				key
			])
		]);
	}));

	return arrayMap( result, function( pattern ) {
		return { pattern: pattern };
	});
};

});
