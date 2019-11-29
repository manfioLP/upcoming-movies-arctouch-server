"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter2_1 = require("eventemitter2");
const Message_1 = require("./Message");
const BBPromise = require("bluebird");
const path = require("path");
class Hub {
    constructor() {
        let config = require(path.resolve("config.json"));
        this.eventemitter = new eventemitter2_1.EventEmitter2(config.eventConfig);
    }
    on(event, listener) {
        this.eventemitter.on(event, listener);
        return this;
    }
    once(event, listener) {
        this.eventemitter.once(event, listener);
        return this;
    }
    un(event, listener) {
        this.eventemitter.off(event, listener);
        return this;
    }
    send(source, event, data, previous) {
        if (!source || (typeof source !== "object")) {
            throw new Error("To send message through Hub, the source is required " +
                "and must extend Source");
        }
        let msg = new Message_1.Message(source.id, event, data, previous);
        process.nextTick(() => {
            try {
                this.eventemitter.emit(event, msg);
            }
            catch (e) {
                console.error("Tentando enviar dados para um HUB Destruido", event, source, e);
            }
        });
        return msg;
    }
    destroy() {
        return new BBPromise((resolve) => {
            Hub.instance = null;
            this.eventemitter.removeAllListeners();
            this.eventemitter = null;
            resolve(true);
        });
    }
    static getInstance() {
        if (!Hub.instance) {
            Hub.instance = new Hub();
        }
        return Hub.instance;
    }
}
exports.Hub = Hub;
//# sourceMappingURL=Hub.js.map