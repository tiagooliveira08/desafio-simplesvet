import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as authActions } from '../../redux/auth';
import './style.css';

import { TextField } from '../../components';
import { logo } from '../../images';

const required = value => (value ? undefined : 'Campo de preenchimento obrigatório!');

let Login = props => (
  <div className="login-box">
    <div className="login-logo">
      <img src={logo} alt="logo" />
    </div>
    <div className="login-box-body">
      <form onSubmit={props.handleSubmit(v => props.login(v))}>
        <Field
          component={TextField}
          label="E-mail"
          type="email"
          name="email"
          id="email"
          placeholder="fulano@email.com"
          validate={[required]}
        />

        <Field
          component={TextField}
          label="Senha"
          type="password"
          name="senha"
          id="senha"
          placeholder="******"
          validate={[required]}
        />

        <button type="submit" className="btn btn-primary btn-block btn-flat">
            Entrar
        </button>
      </form>
    </div>
  </div>
);

Login.propTypes = {
  login: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

Login = reduxForm({ form: 'authForm' })(Login);

const mapDispatchToProps = dispatch => bindActionCreators({ ...authActions }, dispatch);

export default connect(null, mapDispatchToProps)(Login);
