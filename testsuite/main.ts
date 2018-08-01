import { CLIParser } from '../CLIParser';
const assert = require('assert');

const myParser: CLIParser = new CLIParser();

describe ("CLI Parser", async function () {
    it ("Parse a simple flags", async function (done) {
      const result = await myParser.parseCLI("--foo");
      assert.deepEqual (result, {"foo": true});
      done();
    });
    it ("Parse a composite flags", async function (done) {
      const result = await myParser.parseCLI("--foo bar");
      assert.deepEqual (result, {"foo": "bar"});
      done();
    });
    it ("Parse a composite flags with integer values", async function (done) {
      const result = await myParser.parseCLI("--number 1");
      assert.deepEqual (result, {"number": 1});
      done();
    });
    it ("Parse multiple flags at once", async function (done) {
      const result = await myParser.parseCLI("--foo --bar baz --number 1");
      assert.deepEqual (result, {"bar": "baz", "foo": true, "number": 1});
      done();
    });
    it ("Handle multiple values for the same flag", async function (done) {
      const result = await myParser.parseCLI("--foo --bar baz --bar zab --number 1");
      assert.deepEqual (result, {"bar": ["baz", "zab"], "foo": true, "number": 1});
      done();
    });
 });