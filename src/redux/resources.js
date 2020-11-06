import * as ActionTypes from "./ActionTypes";

export const resources = (
  state = { isLoading: true, errMess: null, resources: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_RESOURCES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        resources: action.payload,
      };

    case ActionTypes.RESOURCES_LOADING:
      return { ...state, isLoading: true, errMess: null, resources: [] };

    case ActionTypes.RESOURCES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
