define([
	"globalize",
	"../util"
], function( Globalize, util ) {

QUnit.module( "Globalize class constructor" );

QUnit.test( "should validate parameters", function( assert ) {
	assert.throws(function() {
		new Globalize();
	}, Error, "Missing `locale` parameter" );
	assert.throws(function() {
		Globalize();
	}, Error, "Missing `locale` parameter" );

	util.assertLocaleParameter( assert, "locale", function( invalidValue ) {
		return function() {
			new Globalize( invalidValue );
		};
	});
	util.assertLocaleParameter( assert, "locale", function( invalidValue ) {
		return function() {
			Globalize( invalidValue );
		};
	});
});

});
