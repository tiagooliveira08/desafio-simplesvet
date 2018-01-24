import { service } from '../services';

export const getUsuariosList = () => ({
    type: 'GET_USUARIOS_LIST',
    payload: service.get('/usuarios')
});