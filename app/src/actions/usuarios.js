import { getList } from '../services';

export const fetchList = () => ({
    type: 'USUARIOS_FETCHED',
    payload: getList('usuarios')
});