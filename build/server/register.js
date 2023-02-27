"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pluginId = 'google-geocoder';
exports.default = ({ strapi }) => {
    strapi.customFields.register({
        name: "coordinates",
        plugin: pluginId,
        type: "string",
    });
};
//# sourceMappingURL=register.js.map