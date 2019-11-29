"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("../Application");
const Source_1 = require("../events/Source");
const path = require("path");
class TestManager extends Source_1.Source {
    constructor(callback) {
        super();
        this.hub.on('app.ready', () => {
            callback();
        });
        this.application = new Application_1.Application(path.resolve("./config.json"));
    }
}
exports.TestManager = TestManager;
//# sourceMappingURL=TestManager.js.map