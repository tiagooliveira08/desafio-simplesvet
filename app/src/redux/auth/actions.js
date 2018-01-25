import { toastr } from 'react-redux-toastr';
import { service } from '../services';

export const types = {
    USER_FETCHED: 'USER_FETCHED',
    TOKEN_VALIDATED: 'TOKEN_VALIDATE'
};

export const login = values => {
    return dispatch => {
        service.post('/auth/login', values)
            .then(resp => dispatch({ type: types.USER_FETCHED, payload: resp.data }))
            .catch(e => toastr.error('Error', e));
    };
};

export const validate = token => {
    return dispatch => {
        if(token) {
            service.post('/auth/validate', { token })
                .then(resp => dispatch({ type: types.TOKEN_VALIDATED, payload: resp.data.status }))
                .catch(e => dispatch({ type: types.TOKEN_VALIDATED, payload: false }))
        }
        else {
            dispatch({ type: types.TOKEN_VALIDATED, payload: false })
        }
    }
}

export const logout = () => ({ type: types.TOKEN_VALIDATED, payload: false })