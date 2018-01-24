import { toastr } from 'react-redux-toastr';
import { service } from '../services';
import { RacasAction, ProprietariosAction } from './index';

export const getAnimalList = () => {
    return [
        RacasAction.getRacasList(),
        ProprietariosAction.getProprietariosList(),
        {
            type: 'GET_ANIMAL_LIST',
            payload: service.get('/animais')
        },
    ];
};

export const getAnimalEntry = id => {
    return [
        RacasAction.getRacasList(),
        ProprietariosAction.getProprietariosList(),
        {
            type: 'GET_ANIMAL_ENTRY',
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
            dispatch({ type: 'ANIMAL_IMAGE_UPLOADED', payload: resp.data.file });
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
    type: 'CLEAN_CURRENT_ANIMAL'
});