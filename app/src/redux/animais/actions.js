import { toastr } from 'react-redux-toastr';

import { Actions as ProprietariosAction } from '../proprietarios';
import { Actions as RacasAction } from '../racas';

import { service } from '../services';

export const types = {
    GET_LIST: 'GET_ANIMAL_LIST',
    GET_ENTRY: 'GET_ANIMAL_ENTRY',
    UPLOAD_IMAGE: 'ANIMAL_IMAGE_UPLOADED',
    CLEAN_ENTRY: 'CLEAN_CURRENT_ANIMAL'
};

export const getAnimalList = () => {
    return [
        RacasAction.getRacasList(),
        ProprietariosAction.getProprietariosList(),
        {
            type: types.GET_LIST,
            payload: service.get('/animais')
        },
    ];
};

export const getAnimalEntry = id => {
    return [
        RacasAction.getRacasList(),
        ProprietariosAction.getProprietariosList(),
        {
            type: types.GET_ENTRY,
            payload: service.get(`/animais/${id}`)
        }
    ];
};

export const uploadAnimalImage = image => {
    return dispatch => {
        const data = new FormData();
        data.append('foto', image);

        service.post('/upload', data, { headers: { 'content-type': 'multipart/form-data' } }).then(resp => {
            toastr.success('Sucesso', 'Imagem enviada para nossos servidores!');
            dispatch({ type: types.UPLOAD_IMAGE, payload: resp.data.file });
        })
        .catch(e => toastr.error('Erro!', e.response.data.error));
    }
}

export const createAnimal = values => {
    return dispatch => {
        service.post('/animais', values)
        .then(response => toastr.success('Sucesso', 'Animal cadastrado com sucesso!'))
        .catch(error => toastr.error('Erro', error.response.data.msg));
    };
};

export const updateAnimal = values => {
    return dispatch => {
        service.put(`/animais/${values.codigo}`, values)
        .then(response => toastr.success('Sucesso', 'Animal atualizado com sucesso!'))
        .catch(error => toastr.error('Erro', error.response.data.msg));
    };
};

export const deleteAnimal = id => {
    return dispatch => {
        service.delete(`/animais/${id}`)
        .then(response => {
            toastr.success('Sucesso', 'Animal apagado com sucesso');
            dispatch(getAnimalList());
        })
        .catch(error => toastr.error('Error', error.response.data.msg));
    }
};

export const cleanCurrentAnimal = () => ({
    type: types.CLEAN_ENTRY
});
