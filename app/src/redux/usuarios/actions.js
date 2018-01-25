import { service } from '../services';

export const types = {
  GET_LIST: 'GET_USUARIOS_LIST',
};

export const getUsuariosList = () => ({
  type: types.GET_LIST,
  payload: service.get('/usuarios'),
});
