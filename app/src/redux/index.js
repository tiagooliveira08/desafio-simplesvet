import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { reducer as animaisReducer } from './animais';
import { reducer as authReducer } from './auth';
import { reducer as racasReducer } from './racas';
import { reducer as proprietariosReducer } from './proprietarios';
import { reducer as usuariosReducer } from './usuarios';

export default combineReducers({
  form: formReducer,
  toastr: toastrReducer,
  auth: authReducer,
  animais: animaisReducer,
  racas: racasReducer,
  proprietarios: proprietariosReducer,
  usuarios: usuariosReducer,
});
