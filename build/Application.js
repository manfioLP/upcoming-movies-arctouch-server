"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const HTTP = require("http");
const CORS = require("cors");
const BodyParser = require("body-parser");
const express_1 = require("express");
const Movie_1 = require("./rests/Movie");
class Application {
    constructor(pathConfig) {
        this.restfulSet = {
            MovieRest: Movie_1.MovieRest,
        };
        Application.config = pathConfig;
        this.app = Express;
        this.server = this.initServer();
        this.serverConfiguration();
        this.router = express_1.Router;
        this.serverOk();
        this.initRest();
    }
    set mainPort(port) {
        this._mainPort = port;
    }
    get mainPort() {
        return this._mainPort;
    }
    set server(server) {
        this._server = server;
    }
    get server() {
        return this._server;
    }
    set router(router) {
        this._router = new router();
    }
    get router() {
        return this._router;
    }
    static set config(pathConfig) {
        Application._config = require(pathConfig);
    }
    static get config() {
        return Application._config;
    }
    set app(express) {
        this._app = express();
    }
    get app() {
        return this._app;
    }
    /**
     * É executada assim que o server fica pronto para atender.
     */
    serverOk() {
        this.app.use('/api', this.router);
        console.log(`APP READY. LISTENING ON PORT::${Application.config.server.port}`);
    }
    /**
     * Inicia as configurações do server.
     */
    serverConfiguration() {
        this.app.set('view engine', 'ejs');
        this.app.use(CORS());
        this.app.use(BodyParser.urlencoded({ extended: true }));
        this.app.use(BodyParser.json());
    }
    /**
     *
     * @returns {any}
     *
     * Inicia o server, se no config estiver que é um https, ele inicia com chave.
     * Caso contrario, ele inicia apenas em http.
     */
    initServer() {
        this.mainPort = Application.config.server.port;
        return HTTP.createServer(this.app).listen(this.mainPort);
    }
    initRest() {
        for (let rest in this.restfulSet) {
            if (this.restfulSet.hasOwnProperty(rest)) {
                new this.restfulSet[rest](this.router);
            }
        }
    }
}
exports.Application = Application;
//# sourceMappingURL=Application.js.map