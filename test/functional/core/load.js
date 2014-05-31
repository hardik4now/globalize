define([
	"globalize",
	"../util"
], function( Globalize, util ) {

QUnit.module( "Globalize.load()" );

QUnit.test( "should validate parameters", function( assert ) {
	assert.throws(function() {
		Globalize.load();
	}, Error, "Missing `json` parameter" );

	util.assertPlainObjectParameter( assert, "json", function( invalidValue ) {
		return function() {
			Globalize.load( invalidValue );
		};
	});
});

});
