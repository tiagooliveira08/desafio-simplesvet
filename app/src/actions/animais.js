import { getList } from '../services';

export const fetchList = () => ({
    type: 'ANIMAIS_FETCHED',
    payload: getList('animais')
});