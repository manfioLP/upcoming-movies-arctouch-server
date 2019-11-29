"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Source_1 = require("../events/Source");
const HTTPStatus = require("http-status-codes");
class BasicHandler extends Source_1.Source {
    sendToServer(event, dado) {
        return this.hub.send(this, event, { success: dado, error: null, }).promise;
    }
    async handleReturn(success, data, status) {
        let returnObject;
        if (!success || data.error) {
            returnObject = await this.getError(data);
            returnObject['success'] = success;
        }
        else {
            returnObject = {
                success: true,
                data
            };
        }
        if (status)
            returnObject['status'] = status;
        return returnObject;
    }
    async getError(error) {
        if (error.status_code) {
            return BasicHandler.getExternalError(error);
        }
        if (typeof error === 'string') {
            error = { error };
        }
        return error;
    }
    static getExternalError(error) {
        switch (error.status_code) {
            case 7:
                return { error: 'external api problem - invalid tmdb key', status: HTTPStatus.UNAUTHORIZED };
            case 34:
                return { error: 'external api problem - the requested id was not found on tmdb', status: HTTPStatus.NOT_FOUND };
            default:
                return { error: `external api problem - error code#${error.status_code} not tracked yet`, status: HTTPStatus.BAD_REQUEST };
        }
    }
}
exports.BasicHandler = BasicHandler;
//# sourceMappingURL=Basic.js.map