"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
const path = require("path");
let config = null;
config = path.resolve("config.json");
new Application_1.Application(config);
//# sourceMappingURL=index.js.map