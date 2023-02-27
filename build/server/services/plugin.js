"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const pluginId_1 = __importDefault(require("../utils/pluginId"));
exports.default = ({ strapi }) => ({
    getWelcomeMessage() {
        return 'Welcome to Strapi 🚀. Using plugin google-geocoder.';
    },
    getConfig() {
        const data = strapi.config.get(`plugin.${pluginId_1.default}`, config_1.default.default);
        return data;
    },
});
//# sourceMappingURL=plugin.js.map