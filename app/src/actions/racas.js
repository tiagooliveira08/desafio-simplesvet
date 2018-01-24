import { service } from '../services';

export const getRacasList = () => ({
    type: 'GET_RACAS_LIST',
    payload: service.get('/racas')
});