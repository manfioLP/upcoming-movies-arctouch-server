"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const TestManager_1 = require("./TestManager");
const chai = require('chai');
const chaiHTTP = require('chai-http');
const config = require(path.resolve('devConfig.json'));
chai.use(chaiHTTP);
let expect = chai.expect;
let testManager = null;
const baseURL = `http://localhost:${config.server.port}`;
describe('API', () => {
    before((done) => {
        testManager = new TestManager_1.TestManager(done);
    });
    describe("Livros", () => {
        it("", (done) => {
            done();
        });
    });
});
//# sourceMappingURL=MainRest.js.map