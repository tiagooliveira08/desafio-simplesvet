const INITIAL_STATE = { 
    list: [],
    current: {},
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'ANIMAIS_FETCHED' : 
            return { ...state, list: action.payload.data }
        case 'ANIMAL_FETCHED':
            return {...state, current: action.payload.data };
        case 'ANIMAL_IMAGE_UPLOADED':
            const current = state.current;
            current.foto = action.payload;
            return {...state, current };
        default:
            return state
    }
};