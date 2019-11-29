"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseUtil_1 = require("./BaseUtil");
class FindObject extends BaseUtil_1.BaseUtil {
    constructor(data) {
        super();
        if (data.pagination)
            this.setPagination(data.pagination);
        if (data.orderBy)
            this.setOrderBy(data.orderBy);
        this.findOne = data.findOne ? data.findOne : false;
        this.query = data.query ? data.query : {};
        this.select = data.select;
        this.populate = data.populate;
    }
    ;
    set query(query) {
        if (typeof query === "string") {
            this.id = query;
            this.findOne = false;
        }
        else {
            this._query = Object.assign({}, this._query, query);
        }
    }
    get query() {
        return this._query;
    }
    get sort() {
        return this._sort;
    }
    set sort(sort) {
        this._sort = sort;
    }
    get collation() {
        return this._collation;
    }
    set collation(collation) {
        this._collation = collation;
    }
    set limit(limit) {
        this._limit = limit;
    }
    get limit() {
        return this._limit;
    }
    set skip(skip) {
        this._skip = skip;
    }
    get skip() {
        return this._skip;
    }
    set select(select) {
        this._select = select;
    }
    get select() {
        return this._select;
    }
    set findOne(findOne) {
        this._findOne = findOne;
    }
    get findOne() {
        return this._findOne;
    }
    /**
     *
     * @param {Pagination} pagination
     *
     * Configura a paginação.
     */
    setPagination(pagination) {
        this.skip = (pagination.page - 1) * pagination.limit;
        this.limit = pagination.limit;
    }
    /**
     *
     * @param {OrderBy} orderBy
     *
     * Configura a order.
     */
    setOrderBy(orderBy) {
        let sortObj = {};
        for (let i = 0; i < orderBy.asc.length; i++) {
            sortObj[orderBy.asc[i]] = 1;
        }
        for (let i = 0; i < orderBy.desc.length; i++) {
            sortObj[orderBy.desc[i]] = -1;
        }
        this.sort = sortObj;
        this.collation = { locale: 'pt', strength: 2 };
    }
}
exports.FindObject = FindObject;
//# sourceMappingURL=FindObject.js.map