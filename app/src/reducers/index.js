import { combineReducers } from 'redux'
import { reducer as FormReducer } from 'redux-form'
import { reducer as ToastrReducer } from 'react-redux-toastr';

import animaisReducer from './animais';
import authReducer from './auth';
import racasReducer from './racas';
import proprietariosReducer from './proprietarios';

export default combineReducers({
    form: FormReducer,
    toastr: ToastrReducer,
    auth: authReducer,
    animais: animaisReducer,
    racas: racasReducer,
    proprietarios: proprietariosReducer,
});