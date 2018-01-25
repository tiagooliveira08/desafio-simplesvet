import { toastr } from 'react-redux-toastr';

import { service } from '../../service';

import { actions as animaisAction } from '../animais';
import { actions as usuariosAction } from '../usuarios';

export const types = {
  GET_LIST: 'GET_VACINAS_LIST',
  GET_SCHEDULED_LIST: 'GET_SCHEDULED_LIST',
};

export const getVacinasList = () => ({
  type: types.GET_LIST,
  payload: service.get('/vacinas'),
});

export const getScheduledVacinasList = () => [
  animaisAction.getAnimaisList(),
  usuariosAction.getUsuariosList(),
  {
    type: types.GET_SCHEDULED_LIST,
    payload: service.get('/vacinas/scheduled'),
  },
];

export const scheduleVacina = values => () => {
  service.post('/vacinas/aplicacao', values)
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Erro ao agendar vacinação');
      }

      return toastr.success('Sucesso', 'Vacina agendada com sucesso');
    })
    .catch(error => toastr.error('Erro', 'Erro ao agendar vacinação'));
};

export const deleteScheduledVacina = id => (dispatch) => {
  service.delete(`/vacinas/aplicacao/${id}`)
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Erro ao apagar vacinação');
      }

      dispatch(getScheduledVacinasList());
      return toastr.success('Sucesso', 'Vacinação apagada com sucesso');
    })
    .catch(error => toastr.error('Error', 'Erro ao apagar vacinação'));
};


export const applyVacina = values => (dispatch) => {
  service.post(`/vacinas/aplicacao/${values.codigo}/aplicar`, values)
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Erro ao aplicar vacinação');
      }

      dispatch(getScheduledVacinasList());
      return toastr.success('Sucesso', 'Vacina aplicada com sucesso');
    })
    .catch(error => toastr.error('Erro', 'Erro ao aplicar vacinação'));
}
