const INITIAL_STATE = { 
    list: [],
    current: {},
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'GET_ANIMAL_LIST' : 
            return { ...state, list: action.payload.data }
        case 'GET_ANIMAL_ENTRY':
            return {...state, current: action.payload.data };
        case 'ANIMAL_IMAGE_UPLOADED':
            const current = state.current;
            current.foto = action.payload;
            return {...state, current };
        case 'CLEAN_CURRENT_ANIMAL': 
            return { ...state, current: {} };
        default:
            return state;
    }
};