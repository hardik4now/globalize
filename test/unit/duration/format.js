define([
	"cldr",
	"src/core",
	"src/duration/format",
	"json!fixtures/cldr/main/en/dateFields.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"src/plural"
], function( Cldr, Globalize, durationFormat, enDateFields, likelySubtags ) {

var cldr, globalize;

Cldr.load( enDateFields );
Cldr.load( likelySubtags );

globalize = new Globalize( "en" );
cldr = globalize.cldr;

QUnit.module( "Duration Format" );

// FIXME
QUnit.test( "FIXME", function( assert ) {
	assert.equal( durationFormat( 1, {}, cldr, globalize ), "in 1 year" );
});

});
