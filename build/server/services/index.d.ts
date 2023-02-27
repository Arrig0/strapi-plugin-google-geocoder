declare const _default: {
    plugin: ({ strapi }: {
        strapi: import("@strapi/strapi").Strapi;
    }) => {
        getWelcomeMessage(): string;
        getConfig(): any;
    };
};
export default _default;
