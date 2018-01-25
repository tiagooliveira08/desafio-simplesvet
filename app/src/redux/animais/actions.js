import { toastr } from 'react-redux-toastr';

import { actions as proprietariosAction } from '../proprietarios';
import { actions as racasAction } from '../racas';

import { service } from '../../service';

export const types = {
  GET_LIST: 'GET_ANIMAL_LIST',
  GET_ENTRY: 'GET_ANIMAL_ENTRY',
  UPLOAD_IMAGE: 'ANIMAL_IMAGE_UPLOADED',
  CLEAN_ENTRY: 'CLEAN_CURRENT_ANIMAL',
};

export const getAnimalList = () => [
  racasAction.getRacasList(),
  proprietariosAction.getProprietariosList(),
  {
    type: types.GET_LIST,
    payload: service.get('/animais'),
  },
];

export const getAnimalEntry = id => [
  racasAction.getRacasList(),
  proprietariosAction.getProprietariosList(),
  {
    type: types.GET_ENTRY,
    payload: service.get(`/animais/${id}`),
  },
];

export const uploadAnimalImage = image => (dispatch) => {
  const data = new FormData();
  data.append('foto', image);

  service.post('/upload', data, { headers: { 'content-type': 'multipart/form-data' } })
    .then((resp) => {
      toastr.success('Sucesso', 'Imagem enviada para nossos servidores!');
      dispatch({ type: types.UPLOAD_IMAGE, payload: resp.data.file });
    })
    .catch(e => toastr.error('Erro!', e.response.data.error));
};

export const createAnimal = values => () => {
  service.post('/animais', values)
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Erro ao cadastrar animal');
      }

      return toastr.success('Sucesso', 'Animal cadastrado com sucesso!');
    })
    .catch(error => toastr.error('Erro', error));
};

export const updateAnimal = values => () => {
  service.put(`/animais/${values.codigo}`, values)
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Erro ao atualizar animal');
      }

      return toastr.success('Sucesso', 'Animal atualizado com sucesso!');
    })
    .catch(error => toastr.error('Erro', error));
};

export const deleteAnimal = id => (dispatch) => {
  service.delete(`/animais/${id}`)
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Erro ao apagar animal');
      }

      dispatch(getAnimalList());
      return toastr.success('Sucesso', 'Animal apagado com sucesso');
    })
    .catch(error => toastr.error('Error', error));
};

export const cleanCurrentAnimal = () => [
  racasAction.getRacasList(),
  proprietariosAction.getProprietariosList(),
  {
    type: types.CLEAN_ENTRY,
  },
];
