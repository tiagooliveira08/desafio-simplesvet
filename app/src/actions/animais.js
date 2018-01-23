import { toastr } from 'react-redux-toastr';
import { getList, getEntry, upload, createEntry, updateEntry, deleteEntry } from '../services';
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

export const createAnimal = values => {
    return dispatch => {
        createEntry('animais', values)
        .then(response => toastr.success('Sucesso', 'Animal cadastrado com sucesso!'))
        .then(error => toastr.error('Erro', error.response.data.msg));
    };
};

export const updateAnimal = values => {
    return dispatch => {
        updateEntry('animais', values, values.codigo)
        .then(response => toastr.success('Sucesso', 'Animal atualizado com sucesso!'))
        .then(error => {
            console.log(error);
        });
    };
};

export const deleteAnimal = id => {
    return dispatch => {
        deleteEntry('animais', id)
        .then(response => {
            toastr.success('Sucesso', 'Animal apagado com sucesso');

            dispatch((() => [
                { type: 'ANIMAL_DELETED' },
                fetchList()
            ])());
        })
        .catch(error => toastr.error('Error', error.response.data.msg));
    }
};

export const cleanCurrentAnimal = () => ({
    type: 'CLEAN_CURRENT_ANIMAL'
});