import { getList } from '../services';

export const fetchList = () => ({
    type: 'RACAS_FETCHED',
    payload: getList('racas')
});