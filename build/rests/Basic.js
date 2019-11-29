"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicRest {
    constructor(router) {
        this.router = router;
    }
    set router(router) {
        if (!router) {
            throw new Error('Every API must set a router that isnt null!');
        }
        this._router = router;
    }
    get router() {
        return this._router;
    }
    // wire get routes
    get(routes) {
        for (let name in routes) {
            if (routes.hasOwnProperty(name)) {
                this.router.route(name).get(routes[name]);
            }
        }
    }
    // wire post routes
    post(routes) {
        for (let name in routes) {
            if (routes.hasOwnProperty(name)) {
                this.router.route(name).post(routes[name]);
            }
        }
    }
    // wire put routes
    put(routes) {
        for (let name in routes) {
            if (routes.hasOwnProperty(name)) {
                this.router.route(name).put(routes[name]);
            }
        }
    }
    // wire delete routes
    delete(routes) {
        for (let name in routes) {
            if (routes.hasOwnProperty(name)) {
                this.router.route(name).delete(routes[name]);
            }
        }
    }
    get routes() {
        return this._routes;
    }
    set routes(value) {
        this._routes = value;
    }
    wiring() {
        for (let name in this.routes) {
            if (this.routes.hasOwnProperty(name) && this.routes[name]) {
                this[name](this.routes[name]);
            }
        }
    }
}
exports.BasicRest = BasicRest;
//# sourceMappingURL=Basic.js.map