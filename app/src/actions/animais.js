import { getList } from '../services';

import { RacasAction, ProprietariosAction } from './index';

export const fetchList = () => ({
    type: 'ANIMAIS_FETCHED',
    payload: getList('animais')
});

export const fetchAnimaisData = () => {
    return [
        RacasAction.fetchList(),
        ProprietariosAction.fetchList(),
        fetchList(),
    ];
}