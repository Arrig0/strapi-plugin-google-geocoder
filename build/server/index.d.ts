declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/strapi").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/strapi").Strapi;
    }) => void;
    destroy: ({ strapi }: {
        strapi: import("@strapi/strapi").Strapi;
    }) => void;
    config: {
        default: {
            apiKey: null;
            default_center: null;
        };
        validator(): void;
    };
    controllers: {
        'google-geocoder': ({ strapi }: {
            strapi: import("@strapi/strapi").Strapi;
        }) => {
            config(ctx: any): Promise<void>;
        };
    };
    routes: {
        "admin-api": {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: string[];
                };
            }[];
        };
    };
    services: {
        plugin: ({ strapi }: {
            strapi: import("@strapi/strapi").Strapi;
        }) => {
            getWelcomeMessage(): string;
            getConfig(): any;
        };
    };
};
export default _default;
