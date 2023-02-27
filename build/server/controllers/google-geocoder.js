'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("@strapi/utils"));
const pluginId_1 = __importDefault(require("../utils/pluginId"));
const { ApplicationError } = utils_1.default.errors;
exports.default = ({ strapi }) => ({
    async config(ctx) {
        try {
            const config = await strapi.plugin(`${pluginId_1.default}`).service('plugin').getConfig();
            ctx.send(config);
        }
        catch (e) {
            if (e.statusCode === 400) {
                throw new ApplicationError(e.message);
            }
            else {
                throw new Error(`Errore ${e.message}.`);
            }
        }
    },
});
//# sourceMappingURL=google-geocoder.js.map