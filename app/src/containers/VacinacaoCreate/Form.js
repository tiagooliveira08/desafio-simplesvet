/* eslint react/prop-types: [2,
  { "ignore": [
    "history",
    "history.push",
    "handleSubmit",
    "initialValues",
  ] }] */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ComboField, TextField } from '../../components';
import { required } from '../../helpers/validations';

let Form = props => (
  <form onSubmit={props.handleSubmit}>
    <Field
      id="animal"
      label="Animal"
      name="animal"
      component={ComboField}
      className="form-control"
      validate={[required]}
    >
      <option value="">Escolha um Animal</option>
      {props.animais.map(animal => (
        <option value={animal.codigo} key={animal.codigo}>
          {animal.nome} - (#{animal.codigo})
        </option>
      ))}
    </Field>

    <Field
      id="vacina"
      label="Vacina"
      name="vacina"
      component={ComboField}
      className="form-control"
      validate={[required]}
    >
      <option value="">Escolha uma Vacina</option>
      {props.vacinas.map(vacina => (
        <option value={vacina.codigo} key={vacina.codigo}>
          {vacina.nome} - (#{vacina.codigo})
        </option>
      ))}
    </Field>

    <Field
      id="data_programacao"
      name="data_programacao"
      label="Data da Programação"
      component={TextField}
      type="text"
      className="form-control--date form-control"
      validate={[required]}
    />

    <Field
      id="usuario"
      name="usuario"
      component="input"
      type="hidden"
      value={1}
    />

    <button className="btn btn-default">Cadastrar Vacinação</button>
  </form>
);

Form.propTypes = {
  animais: PropTypes.instanceOf(Array).isRequired,
  vacinas: PropTypes.instanceOf(Array).isRequired,
};

Form = reduxForm({ form: 'VacinacaoCreateForm', enableReinitialize: true })(Form);

const mapStateToProps = state => ({
  vacinas: state.vacinas.list,
  animais: state.animais.list,
  usuario: state.auth.user.usuario.id,
});

export default connect(mapStateToProps)(Form);
