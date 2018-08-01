"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CLIParser_1 = require("../CLIParser");
const assert = require('assert');
const myParser = new CLIParser_1.CLIParser();
describe("CLI Parser", function () {
    return __awaiter(this, void 0, void 0, function* () {
        it("Parse a simple flags", function (done) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield myParser.parseCLI("--foo");
                assert.deepEqual(result, { "foo": true });
                done();
            });
        });
        it("Parse a composite flags", function (done) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield myParser.parseCLI("--foo bar");
                assert.deepEqual(result, { "foo": "bar" });
                done();
            });
        });
        it("Parse a composite flags with integer values", function (done) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield myParser.parseCLI("--number 1");
                assert.deepEqual(result, { "number": 1 });
                done();
            });
        });
        it("Parse multiple flags at once", function (done) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield myParser.parseCLI("--foo --bar baz --number 1");
                assert.deepEqual(result, { "bar": "baz", "foo": true, "number": 1 });
                done();
            });
        });
        it("Handle multiple values for the same flag", function (done) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield myParser.parseCLI("--foo --bar baz --bar zab --number 1");
                assert.deepEqual(result, { "bar": ["baz", "zab"], "foo": true, "number": 1 });
                done();
            });
        });
    });
});
//# sourceMappingURL=main.js.map