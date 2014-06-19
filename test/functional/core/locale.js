define([
	"globalize",
	"../util",
	"globalize/date",
	"globalize/message",
	"globalize/number"
], function( Globalize, util ) {

QUnit.module( "Globalize.locale()" );

QUnit.test( "should validate parameters", function( assert ) {
	util.assertLocaleOrNullParameter( assert, "locale", function( invalidValue ) {
		return function() {
			Globalize.locale( invalidValue );
		};
	});
});

QUnit.test( "should validate whether default locale is defined on static calls", function( assert ) {
	assert.throws(function() {
		Globalize.formatDate( new Date(), "GyMMMEd" );
	}, /E_DEFAULT_LOCALE_NOT_DEFINED/, "Default locale has not been defined" );

	assert.throws(function() {
		Globalize.parseDate( "15", "d" );
	}, /E_DEFAULT_LOCALE_NOT_DEFINED/, "Default locale has not been defined" );

	assert.throws(function() {
		Globalize.formatNumber( 3 );
	}, /E_DEFAULT_LOCALE_NOT_DEFINED/, "Default locale has not been defined" );

	assert.throws(function() {
		Globalize.parseNumber( "3" );
	}, /E_DEFAULT_LOCALE_NOT_DEFINED/, "Default locale has not been defined" );

	assert.throws(function() {
		Globalize.translate( "amen" );
	}, /E_DEFAULT_LOCALE_NOT_DEFINED/, "Default locale has not been defined" );
});

});
