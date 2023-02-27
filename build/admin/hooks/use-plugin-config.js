"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const helper_plugin_1 = require("@strapi/helper-plugin");
const pluginId_1 = __importDefault(require("../pluginId"));
const RESOLVE_CONFIG = `${pluginId_1.default}/resolve-config`;
const usePluginConfig = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const toggleNotification = (0, helper_plugin_1.useNotification)();
    const { config, isConfigLoading } = (0, react_redux_1.useSelector)((state) => state[`${pluginId_1.default}_config`]);
    (0, react_1.useEffect)(() => {
        if (!isConfigLoading && !!config) {
            return;
        }
        const abortController = new AbortController();
        const fetchData = async () => {
            try {
                const endpoint = `/${pluginId_1.default}/config`;
                const data = await (0, helper_plugin_1.request)(endpoint, {
                    method: "GET",
                    signal: abortController.signal,
                });
                return data ?? {};
            }
            catch (err) {
                if (!abortController.signal.aborted) {
                    toggleNotification({
                        type: "warning",
                        message: { id: "notification.error" },
                    });
                    return err;
                }
            }
        };
        fetchData().then((data) => dispatch({ type: RESOLVE_CONFIG, data }));
        return () => abortController.abort();
    }, [dispatch, toggleNotification]);
    return { config, isConfigLoading };
};
exports.default = usePluginConfig;
//# sourceMappingURL=use-plugin-config.js.map