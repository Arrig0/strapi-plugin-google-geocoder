"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const pluginId_1 = __importDefault(require("../pluginId"));
const reducers = {
    [`${pluginId_1.default}_config`]: config_1.default,
};
exports.default = reducers;
//# sourceMappingURL=index.js.map