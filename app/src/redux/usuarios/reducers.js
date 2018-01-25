import { types } from './actions';

const INITIAL_STATE = {
    list: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.GET_LIST:
            return { ...state, list: action.payload.data }
        default:
            return state
    }
}
