import { toastr } from 'react-redux-toastr';

import { login, validate } from '../services';

export const loginAction = (values) => {
    return dispatch => {
        login(values).then(resp => {
            dispatch([
                {
                    type: 'USER_FETCHED',
                    payload: resp.data
                }
            ])
        })
        .catch(e => {
            toastr.error('Error', e)
        })
    }
}

export const validateTokenAction = token => {
    return dispatch => {
        if(token) {
            validate(token).then(resp => {
                dispatch({
                    type: 'TOKEN_VALIDATED',
                    payload: resp.data.status
                })
            })
            .catch(e => dispatch({
                type: 'TOKEN_VALIDATED',
                payload: false
            }))
        }
        else {
            dispatch({
                type: 'TOKEN_VALIDATED',
                payload: false
            })
        }
    }
}

export const logoutAction = () => ({ type: 'TOKEN_VALIDATED', payload: false })