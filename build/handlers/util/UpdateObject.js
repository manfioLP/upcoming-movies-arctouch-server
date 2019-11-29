"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseUtil_1 = require("./BaseUtil");
class UpdateObject extends BaseUtil_1.BaseUtil {
    constructor(data) {
        super();
        this.query = data.query;
        this.update = data.update;
        this.populate = data.populate;
        this.newResponse = data.new ? data.new : true;
        this.runValidators = data.runValidators ? data.runValidators : true;
        this.options = data.options;
        this.select = data.select;
    }
    ;
    set query(query) {
        if (typeof query === "string") {
            this.id = query;
        }
        else {
            this._query = Object.assign({}, this._query, query);
            this.options = { multi: true };
        }
    }
    set update(update) {
        this._update = this.handlerSetUpdate(update);
    }
    get update() {
        return this._update;
    }
    set options(options) {
        if (options)
            if (!this._options)
                this._options = options;
            else
                this._options = Object.assign({}, this._options, options);
    }
    get options() {
        return this._options;
    }
    set select(select) {
        if (Array.isArray(select) && select.length) {
            let fields = {
                select: {}
            };
            for (let i = 0; i < select.length; i++) {
                fields.select[select[i]] = 1;
            }
            this.options = fields;
        }
    }
    set newResponse(newResponse) {
        if (newResponse)
            this.options = { new: true };
    }
    set runValidators(runValidators) {
        if (runValidators)
            this.options = { runValidators: true };
    }
    /**
     *
     * @param {object} update
     * @returns {object}
     *
     * Make a handler to create a pattern of update param.
     */
    handlerSetUpdate(update) {
        this.beforeSetUpdate(update);
        let ret = { $set: update };
        if (update.hasOwnProperty("$inc") || update.hasOwnProperty("$addToSet") || update.hasOwnProperty("$pull") || update.hasOwnProperty("$push") || update.hasOwnProperty("$set") || update.hasOwnProperty("$unset"))
            return update;
        return ret;
    }
    /**
     *
     * @param update
     *
     * Remove the attribute id and _id, if the model pass in UpdateObject.
     */
    beforeSetUpdate(update) {
        if (Array.isArray(update)) {
            for (let i = 0; i < update.length; i++) {
                delete update[i].id;
                delete update[i]._id;
            }
        }
        else {
            delete update.id;
            delete update._id;
        }
    }
}
exports.UpdateObject = UpdateObject;
//# sourceMappingURL=UpdateObject.js.map