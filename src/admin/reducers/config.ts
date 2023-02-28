import produce from "immer";

import { RESOLVE_CONFIG } from "../constants";

const initialState = {
  isConfigLoading: true,
  config: {
      apiKey: null,
      types: ['geocode'],
      componentRestrictions: {}
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
