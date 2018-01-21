import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TextField } from '../../components';

import { AuthAction } from '../../actions';

import './style.css';

import logo from '../../resources/images/logo-simplesvet.png';

let Login = props => {
    const { handleSubmit } = props;

    return (
        <div className="login-box">
            <div className="login-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="login-box-body">
                <form onSubmit={ handleSubmit(v => props.loginAction(v)) }>
                    <Field component={ TextField } type="email" name="email"
                        placeholder="E-mail" icon='envelope' />
                    <Field component={ TextField } type="password" name="senha"
                        placeholder="Senha" icon='lock' />
    
                    <button type="submit" className="btn btn-primary btn-block btn-flat">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

Login = reduxForm({ form: 'authForm' })(Login);

const mapDispatchToProps = dispatch => bindActionCreators({ ...AuthAction }, dispatch);

export default connect(null, mapDispatchToProps)(Login);