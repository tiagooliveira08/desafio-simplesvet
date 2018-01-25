import { service } from '../services';

export const types = {
    GET_LIST: 'GET_PROPRIETARIOS_LIST'
};

export const getProprietariosList = () => ({
    type: types.GET_LIST,
    payload: service.get('/proprietarios')
});