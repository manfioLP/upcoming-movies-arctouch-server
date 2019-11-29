"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const Source_1 = require("../events/Source");
const Mongoose = require("mongoose");
class Database extends Source_1.Source {
    constructor(config) {
        super();
        this.mongoose = Mongoose;
        this.mongoose.Promise = Promise;
        this.managers = index_1.Managers;
        this.wiring();
        this.init(config.mongodb);
    }
    wiring() {
        this.mongoose.connection.on('error', this.mongooseError.bind(this));
    }
    set mongoose(mongoose) {
        this._mongoose = mongoose;
    }
    get mongoose() {
        return this._mongoose;
    }
    set managers(managers) {
        this._managers = managers;
    }
    get managers() {
        return this._managers;
    }
    mongooseError(error, value) {
        return console.error('error', error, value);
    }
    async init(config) {
        try {
            await this.mongoose.connect(`mongodb://${config.host}/${config.name}`, { useUnifiedTopology: true, useNewUrlParser: true });
            this.hub.send(this, 'database.ready', { success: true, error: false });
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
    async destroy() {
        try {
            await this.mongoose.connection.close();
        }
        catch (e) {
            console.error(e);
            process.exit(1);
        }
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map