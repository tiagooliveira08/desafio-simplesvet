import { toastr } from 'react-redux-toastr';
import { getList, getEntry, upload } from '../services';

import { RacasAction, ProprietariosAction } from './index';

export const fetchList = () => ({
    type: 'ANIMAIS_FETCHED',
    payload: getList('animais')
});

export const fetchEntry = (id) => ({
    type: 'ANIMAL_FETCHED',
    payload: getEntry('animais', id)
});

export const fetchAnimaisData = () => {
    return [
        RacasAction.fetchList(),
        ProprietariosAction.fetchList(),
        fetchList(),
    ];
};

export const fetchAnimailData = (id) => {
    return [
        RacasAction.fetchList(),
        ProprietariosAction.fetchList(),
        fetchEntry(id)
    ];
};

export const uploadAnimalImage = (file) => {
    return dispatch => {
        upload(file)
            .then(resp => {
                toastr.success('Sucesso', 'Imagem enviada para nossos servidores!');
                console.log(resp);

                dispatch({
                    type: 'ANIMAL_IMAGE_UPLOADED',
                    payload: resp.data.file
                });
            })
            .catch(e => {
                toastr.error('Erro!', e.response.data.error);
            })
    }
}