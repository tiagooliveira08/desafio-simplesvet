import { service } from '../services';

export const fetchList = () => ({
    type: 'USUARIOS_FETCHED',
    payload: service.get('/usuarios')
});