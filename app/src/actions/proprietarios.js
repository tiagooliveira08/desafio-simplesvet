import { getList } from '../services';

export const fetchList = () => ({
    type: 'PROPRIETARIOS_FETCHED',
    payload: getList('proprietarios')
});