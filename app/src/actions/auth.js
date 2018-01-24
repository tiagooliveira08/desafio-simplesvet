import { toastr } from 'react-redux-toastr';
import { service } from '../services';

export const login = values => {
    return dispatch => {
        service.post('/auth/login', values)
            .then(resp => dispatch({ type: 'USER_FETCHED', payload: resp.data }))
            .catch(e => toastr.error('Error', e));
    };
};

export const validate = token => {
    return dispatch => {
        if(token) {
            service.post('/auth/validate', { token })
                .then(resp => dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data.status }))
                .catch(e => dispatch({ type: 'TOKEN_VALIDATED', payload: false }))
        }
        else {
            dispatch({ type: 'TOKEN_VALIDATED', payload: false })
        }
    }
}

export const logout = () => ({ type: 'TOKEN_VALIDATED', payload: false })