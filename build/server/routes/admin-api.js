'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: "admin",
    routes: [
        {
            method: "GET",
            path: "/config",
            handler: "google-geocoder.config",
            config: {
                policies: ["admin::isAuthenticatedAdmin"],
            },
        },
    ],
};
//# sourceMappingURL=admin-api.js.map