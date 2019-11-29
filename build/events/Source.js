"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hub_1 = require("./Hub");
const node_uuid_1 = require("node-uuid");
class Source {
    constructor() {
        this.id = node_uuid_1.v4();
        this.hub = Hub_1.Hub.getInstance();
    }
    set id(uuid) {
        this._id = uuid;
    }
    get id() {
        return this._id;
    }
    set hub(hub) {
        this._hub = hub;
    }
    get hub() {
        return this._hub;
    }
    destroy() {
        this.hub.send(this, "hub.core.source.destroyed", {
            error: null,
            success: this.id,
        });
        this.id = null;
    }
}
exports.Source = Source;
//# sourceMappingURL=Source.js.map