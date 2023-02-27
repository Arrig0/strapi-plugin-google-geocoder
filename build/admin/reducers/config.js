"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const immer_1 = __importDefault(require("immer"));
const RESOLVE_CONFIG = `google-geocoder/resolve-config`;
const initialState = {
    isConfigLoading: true,
    config: {
        apiKey: null,
    },
};
const configReducer = (0, immer_1.default)((state = initialState, action) => {
    switch (action.type) {
        case RESOLVE_CONFIG: {
            state.isConfigLoading = false;
            state.config = action.data;
            break;
        }
        default:
            return state;
    }
    return state;
});
exports.default = configReducer;
//# sourceMappingURL=config.js.map