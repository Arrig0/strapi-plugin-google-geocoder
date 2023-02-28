"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const helper_plugin_1 = require("@strapi/helper-plugin");
const LiveRegions_1 = require("@strapi/design-system/LiveRegions");
const Stack_1 = require("@strapi/design-system/Stack");
const Flex_1 = require("@strapi/design-system/Flex");
const Link_1 = require("@strapi/design-system/Link");
const Typography_1 = require("@strapi/design-system/Typography");
const Field_1 = require("@strapi/design-system/Field");
const react_google_autocomplete_1 = require("react-google-autocomplete");
const react_intl_1 = require("react-intl");
const getAddress_1 = __importDefault(require("../../utils/getAddress"));
const use_plugin_config_1 = __importDefault(require("../../hooks/use-plugin-config"));
const Box_1 = require("@strapi/design-system/Box");
const design_system_1 = require("@strapi/design-system");
function splitLastOccurrence(str, substring) {
    const lastIndex = str.lastIndexOf(substring);
    const before = str.slice(0, lastIndex);
    const after = str.slice(lastIndex + 1);
    return [before, after];
}
const fields = [
    'country',
    'region',
    'city',
    'street',
    'home',
    'postal_code',
];
const GeocoderInput = ({ value, onChange, name, intlLabel, labelAction, required, attribute, description, placeholder, disabled, error, config: { apiKey, types, componentRestrictions }, }) => {
    console.log('Google apiKey', apiKey);
    console.log('Field name', name);
    console.log('Field attribute', attribute);
    const { initialData, modifiedData, onChange: onCMChange } = (0, helper_plugin_1.useCMEditViewDataManager)();
    const toggleNotification = (0, helper_plugin_1.useNotification)();
    const { formatMessage } = (0, react_intl_1.useIntl)();
    const { notifyStatus } = (0, LiveRegions_1.useNotifyAT)();
    const [componentName, fieldName] = name.includes('.') ? splitLastOccurrence(name, '.') : ['', name];
    const maybeUpdateOtherFields = (place) => {
        const isGoogleAutocompleteResponse = Object.hasOwn(place, 'address_components') ? true : false;
        if (!isGoogleAutocompleteResponse) {
            console.log('No Google Address selected. Skip.');
            return;
        }
        const parsed = (0, getAddress_1.default)(place.address_components);
        console.log('Check if there are fields to automatically update for place');
        if (attribute['options']['latitude_field_name']) {
            const realFieldName = (componentName === '') ? attribute['options']['latitude_field_name'] : `${componentName}.` + attribute['options']['latitude_field_name'];
            console.log('updating', realFieldName, place.geometry.location.lat());
            onCMChange({
                target: { name: realFieldName, value: place.geometry.location.lat() },
            });
        }
        if (attribute['options']['longitude_field_name']) {
            const realFieldName = (componentName === '') ? attribute['options']['longitude_field_name'] : `${componentName}.` + attribute['options']['longitude_field_name'];
            console.log('updating', realFieldName, place.geometry.location.lng());
            onCMChange({
                target: { name: realFieldName, value: place.geometry.location.lng() },
            });
        }
        fields.forEach((field) => {
            if (attribute['options'][`${field}_field_name`]) {
                const realFieldName = (componentName === '') ? attribute['options'][`${field}_field_name`] : `${componentName}.` + attribute['options'][`${field}_field_name`];
                console.log('updating', realFieldName, parsed[field]);
                onCMChange({
                    target: { name: realFieldName, value: parsed[field] },
                });
            }
        });
    };
    const { ref } = (0, react_google_autocomplete_1.usePlacesWidget)({
        apiKey: apiKey,
        onPlaceSelected: (place) => {
            onChange?.({
                target: {
                    name,
                    value: place.formatted_address,
                    type: attribute.type,
                }
            });
            maybeUpdateOtherFields(place);
        },
        options: {
            types: types,
            componentRestrictions: componentRestrictions
        }
    });
    return (react_1.default.createElement(Field_1.Field, { name: name, id: name, error: error, hint: description && formatMessage(description) },
        react_1.default.createElement(Stack_1.Stack, { spacing: 1 },
            react_1.default.createElement(Flex_1.Flex, null,
                react_1.default.createElement(Field_1.FieldLabel, { action: labelAction, required: required }, formatMessage(intlLabel)),
                react_1.default.createElement(Flex_1.Flex, { width: "100%", justifyContent: "flex-end" },
                    react_1.default.createElement(Link_1.Link, { href: `https://www.google.com/maps/search/?api=1&query=${value}` }, "link to map here"))),
            react_1.default.createElement(Field_1.FieldInput, { ref: ref, placeholder: placeholder, "aria-label": formatMessage(intlLabel), "aria-disabled": disabled, disabled: disabled, value: value, onChange: onChange }),
            react_1.default.createElement(Field_1.FieldHint, null),
            react_1.default.createElement(Field_1.FieldError, null))));
};
const GoogleGeocoderInput = (props) => {
    const { config, isConfigLoading } = (0, use_plugin_config_1.default)();
    return config && config.apiKey ? (react_1.default.createElement(GeocoderInput, { ...props, config: config })) : (!isConfigLoading && !config.apiKey) ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Field_1.FieldLabel, null, props.name),
        react_1.default.createElement(Box_1.Box, { paddingTop: "1" },
            react_1.default.createElement(design_system_1.Status, { variant: "warning", size: "S", showBullet: false },
                react_1.default.createElement(Typography_1.Typography, null,
                    react_1.default.createElement(Typography_1.Typography, null,
                        "Missing: ",
                        !config.apiKey && react_1.default.createElement(Typography_1.Typography, { fontWeight: "bold" }, "apiKey"))),
                react_1.default.createElement("br", null),
                react_1.default.createElement(Link_1.Link, { href: "https://github.com/spalz/strapi-plugin-google-map-picker", isExternal: true }, "Installation Instructions (GitHub)"))))) : null;
};
exports.default = GoogleGeocoderInput;
//# sourceMappingURL=index.js.map