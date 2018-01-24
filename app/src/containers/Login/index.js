import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AuthAction } from '../../actions';

import './style.css';

import logo from '../../images/logo-simplesvet.png';

let Login = props => {
    const { handleSubmit } = props;

    return (
        <div className="login-box">
            <div className="login-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="login-box-body">
                <form onSubmit={ handleSubmit(v => props.login(v)) }>
                    <div className="form-group">
                        <label htmlFor="email" className="control-label">Nome</label>
                        <Field component='input' type="email" name="email"
                            placeholder="E-mail" icon='envelope' className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="senha" className="control-label">Senha</label>
                        <Field component='input' type="password" name="senha"
                            placeholder="Senha" icon='lock' className="form-control"/>
                    </div>
    
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