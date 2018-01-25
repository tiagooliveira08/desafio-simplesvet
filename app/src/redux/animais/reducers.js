import { types } from './actions';

const INITIAL_STATE = {
  list: [],
  current: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_LIST: {
      return { ...state, list: action.payload.data };
    }
    case types.GET_ENTRY: {
      return { ...state, current: action.payload.data };
    }
    case types.UPLOAD_IMAGE: {
      const { current } = state;
      current.foto = action.payload;
      return { ...state, current };
    }
    case types.CLEAN_ENTRY: {
      return { ...state, current: {} };
    }
    default: {
      return state;
    }
  }
};
