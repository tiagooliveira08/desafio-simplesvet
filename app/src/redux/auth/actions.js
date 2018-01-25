import { toastr } from 'react-redux-toastr';
import { service } from '../../service';

export const types = {
  USER_FETCHED: 'USER_FETCHED',
  TOKEN_VALIDATED: 'TOKEN_VALIDATE',
};

export const login = values => (dispatch) => {
  service.post('/auth/login', values)
    .then((response) => {
      if (response.status === 404) {
        throw new Error('Usuário ou senha incorreta.');
      }

      return dispatch({ type: types.USER_FETCHED, payload: response.data });
    })
    .catch(e => toastr.error('Error', e));
};

export const validate = token => (dispatch) => {
  if (token) {
    service.post('/auth/validate', { token })
      .then((response) => {
        if (response.status === 500) {
          throw new Error('Erro ao validar sessão');
        }

        return dispatch({ type: types.TOKEN_VALIDATED, payload: response.data.status });
      })
      .catch((error) => {
        toastr.error('Error', error);

        return dispatch({ type: types.TOKEN_VALIDATED, payload: false });
      });
  } else {
    dispatch({ type: types.TOKEN_VALIDATED, payload: false });
  }
};

export const logout = () => ({ type: types.TOKEN_VALIDATED, payload: false });
