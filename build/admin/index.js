"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_plugin_1 = require("@strapi/helper-plugin");
const pluginId_1 = __importDefault(require("./pluginId"));
const reducers_1 = __importDefault(require("./reducers"));
const getTrad_1 = __importDefault(require("./utils/getTrad"));
const GoogleGeocoderIcon_1 = __importDefault(require("./components/GoogleGeocoderIcon"));
const en = __importStar(require("./translations/en.json"));
const googleFields = [
    "country",
    "region",
    "city",
    "street",
    "home",
    "postalcode",
    "latitude",
    "longitude",
];
let advancedItems = [];
googleFields.forEach(function (field) {
    advancedItems.push({
        name: `options.${field}_field_name`,
        type: 'text',
        intlLabel: {
            id: (0, getTrad_1.default)(`google-geocoder.options.advanced.${field}-field`),
            defaultMessage: `${field} field name`,
        },
        description: {
            id: (0, getTrad_1.default)(`google-geocoder.options.advanced.${field}-field.description`),
            defaultMessage: `Insert the name of the "${field}" field to be auto populated`,
        },
    });
});
exports.default = {
    register(app) {
        app.customFields.register({
            name: 'coordinates',
            pluginId: 'google-geocoder',
            type: 'string',
            icon: GoogleGeocoderIcon_1.default,
            intlLabel: {
                id: (0, getTrad_1.default)('google-geocoder.label'),
                defaultMessage: 'Google Addresss',
            },
            intlDescription: {
                id: (0, getTrad_1.default)('google-geocoder.description'),
                defaultMessage: 'enter an address and automatically geocode it',
            },
            components: {
                Input: async () => Promise.resolve().then(() => __importStar(require('./components/GoogleGeocoderInput'))),
            },
            options: {
                base: [],
                advanced: [
                    {
                        sectionTitle: {
                            id: 'global.settings',
                            defaultMessage: 'Settings',
                        },
                        items: advancedItems,
                    },
                ],
                validator: () => ({}),
            },
        });
        app.addReducers(reducers_1.default);
    },
    async registerTrads({ locales }) {
        console.log('called registerTrads', locales);
        const importedTrads = await Promise.all(locales.map((locale) => {
            return {
                data: (0, helper_plugin_1.prefixPluginTranslations)(en, pluginId_1.default),
                locale,
            };
        }));
        return Promise.resolve(importedTrads);
    },
};
//# sourceMappingURL=index.js.map