import { service } from '../services';

export const getProprietariosList = () => ({
    type: 'GET_PROPRIETARIOS_LIST',
    payload: service.get('/proprietarios')
});