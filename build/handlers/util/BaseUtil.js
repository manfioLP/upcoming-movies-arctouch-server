"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseUtil {
    constructor() {
        this._query = { removed: false };
    }
    ;
    set id(id) {
        this.clear();
        this._id = id;
    }
    get id() {
        return this._id;
    }
    set query(query) {
        if (typeof query === "string") {
            this.id = query;
        }
        else {
            this._query = Object.assign({}, this._query, query);
        }
    }
    get query() {
        return this._query;
    }
    set populate(populate) {
        if (populate)
            this._populate = this.handlerPopulate(populate);
    }
    get populate() {
        return this._populate;
    }
    /**
     * Limpa os dados que são desnecessarios na busca pelo id.
     */
    clear() {
        delete this.query;
    }
    /**
     *
     * @param {Populate[]} populate
     * @returns {Populate[]}
     *
     * Ajusta o populate quando é chamando.
     */
    handlerPopulate(populate) {
        if (!Array.isArray(populate))
            populate = [populate];
        for (let i = 0; i < populate.length; i++) {
            if (populate[i].hasOwnProperty('select'))
                populate[i].select = 'id ' + populate[i].select;
            if (populate[i].hasOwnProperty('populate'))
                populate[i].populate = this.handlerPopulate(populate[i].populate);
        }
        return populate;
    }
}
exports.BaseUtil = BaseUtil;
//# sourceMappingURL=BaseUtil.js.map