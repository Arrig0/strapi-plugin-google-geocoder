import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { request, useNotification } from "@strapi/helper-plugin";
import pluginId from '../pluginId';
//import { RESOLVE_CONFIG } from "../constants";
const RESOLVE_CONFIG = `${pluginId}/resolve-config`;

const usePluginConfig = () => {
    const dispatch = useDispatch();
    const toggleNotification = useNotification();
    const { config, isConfigLoading } = useSelector((state: any) => state[`${pluginId}_config`]);

    useEffect(() => {
        if (!isConfigLoading && !!config) {
            return;
        }

        const abortController = new AbortController();

        const fetchData = async () => {
            try {
                const endpoint = `/${pluginId}/config`;
                const data = await request(endpoint, {
                    method: "GET",
                    signal: abortController.signal,
                });

                return data ?? {};
            } catch (err) {
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

export default usePluginConfig;
