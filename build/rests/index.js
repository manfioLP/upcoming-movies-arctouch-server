"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Source_1 = require("../events/Source");
const Movie_1 = require("../rests/Movie");
class InitRest extends Source_1.Source {
    constructor(router) {
        super();
        this.restfulSet = {
            MovieRest: Movie_1.MovieRest,
        };
        for (let restful in this.restfulSet) {
            if (this.restfulSet.hasOwnProperty(restful)) {
                new this.restfulSet[restful](router);
            }
        }
        process.nextTick(() => {
            this.hub.send(this, 'restful.ready', { success: null, error: null });
        });
    }
    set restfulSet(restful) {
        this._restfulSet = restful;
    }
    get restfulSet() {
        return this._restfulSet;
    }
}
exports.InitRest = InitRest;
//# sourceMappingURL=index.js.map