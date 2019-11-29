"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let schema = {
    id: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
        index: true,
    },
    removed: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
        index: true,
    },
};
exports.BaseSchema = schema;
//# sourceMappingURL=BaseSchema.js.map