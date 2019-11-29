"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BBPromise = require("bluebird");
const node_uuid_1 = require("node-uuid");
const Hub_1 = require("./Hub");
class Message {
    constructor(source_id, event, data, previous_message) {
        this.id = node_uuid_1.v4();
        this.data = data; // {error: error, success: success}
        this.source_id = source_id;
        this.previous_message = previous_message;
        this.event = event;
    }
    set source_id(source_id) {
        this._source_id = source_id;
    }
    get source_id() {
        return this._source_id;
    }
    set id(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
    set previous_message(previous_message) {
        this._previous_message = previous_message;
    }
    get previous_message() {
        return this._previous_message;
    }
    set data(data) {
        if (!data || !data.hasOwnProperty('success') || !data.hasOwnProperty('error'))
            throw new Error(`Mensagem no formato incorreto. 
											 Esperado: {success: any, error: any}. 
											 Recebido ${JSON.stringify(data)}`);
        this._data = data;
    }
    get data() {
        return this._data;
    }
    set event(event) {
        this._event = event;
    }
    get event() {
        return this._event;
    }
    set promise(promise) {
        this._promise = promise;
    }
    get promise() {
        if (this._promise)
            return this._promise;
        let hub = Hub_1.Hub.getInstance();
        let promiseHandler = null;
        this.promise = new BBPromise((resolve) => {
            promiseHandler = (message) => {
                if (this.id === message.previous_message) {
                    hub.un(this.event, promiseHandler);
                    return resolve(message);
                }
            };
        });
        hub.on(this.event, promiseHandler);
        this.promise.timeout(30000).catch((e) => {
            console.log("error", e);
            hub.un(this.event, promiseHandler);
        });
        return this._promise;
    }
}
exports.Message = Message;
//# sourceMappingURL=Message.js.map