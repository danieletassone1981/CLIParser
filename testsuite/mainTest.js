const CLIParser = require("../CLIParser").CLIParser;
const assert = require('assert');
const mocha = require("mocha");

const myParser = new CLIParser();

describe ("CLI Parser",  function () {
    it ("Parse a simple flags",  function (done) {
      myParser.parseCLI("--foo").then ((result) => {
        assert.deepEqual (result, {"foo": true});
        done();  
      })
    });
    it ("Parse a composite flags",  function (done) {
      myParser.parseCLI("--foo bar").then ((result) => {
        assert.deepEqual (result, {"foo": "bar"});
        done();  
      });
    });
    it ("Parse a composite flags with integer values",  function (done) {
      myParser.parseCLI("--number 1").then ((result) => {
        assert.deepEqual (result, {"number": 1});
        done();  
      });
    });
    it ("Parse multiple flags at once",  function (done) {
      myParser.parseCLI("--foo --bar baz --number 1").then ((result) => {
        assert.deepEqual (result, {"bar": "baz", "foo": true, "number": 1});
        done();  
      });
    });
    it ("Handle multiple values for the same flag",  function (done) {
      myParser.parseCLI("--foo --bar baz --bar zab --number 1").then ((result) => {
        assert.deepEqual (result, {"bar": ["baz", "zab"], "foo": true, "number": 1});
        done();  
      });
    });
 });