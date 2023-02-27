import produce from "immer";

//import { RESOLVE_CONFIG } from "../constants";
const RESOLVE_CONFIG = `google-geocoder/resolve-config`;

const initialState = {
  isConfigLoading: true,
  config: {
      apiKey: null,
  },
};

const configReducer = produce((state = initialState, action) => {
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

export default configReducer;
