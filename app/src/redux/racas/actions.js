import { service } from '../../service';

export const types = {
  GET_LIST: 'GET_RACAS_LIST',
};

export const getRacasList = () => ({
  type: types.GET_LIST,
  payload: service.get('/racas'),
});
