/* eslint react/prop-types: [2,
  { "ignore": [
    "history",
    "history.push",
    "handleSubmit",
    "initialValues",
    "initialValues.foto",
    "foto"
  ] }] */

import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { UPLOADS_URL } from '../../service';
import { TextField, ComboField } from '../../components';
import './style.css';

const required = value => (value ? undefined : 'Campo de preenchimento obrigatório!');

class AnimalForm extends Component {
  constructor(props) {
    super(props);
    this.onFotoButtonClick = this.onFotoButtonClick.bind(this);
    this.handleFotoUpload = this.handleFotoUpload.bind(this);
  }

  onFotoButtonClick(e) {
    e.preventDefault();
    document.getElementById('animalFotoFile').click();
  }

  handleFotoUpload(e) {
    const file = e.target.files[0];
    this.props.fotoUpload(file);
  }

  renderAnimalFoto() {
    if (this.props.initialValues && this.props.initialValues.foto) {
      return (
        <img src={`${UPLOADS_URL}/${this.props.initialValues.foto}`} id="animalFotoPreview" alt="Foto do Animal" />
      );
    }

    if (this.props.foto) {
      return (
        <img src={`${UPLOADS_URL}/${this.props.foto}`} id="animalFotoPreview" alt="Foto do Animal" />
      );
    }

    return false;
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="box-body">
          <div className="row">
            <div className="col-xs-12 col-md-8">
              <Field
                id="nome"
                name="nome"
                label="Nome"
                component={TextField}
                type="text"
                placeholder="Informe o nome"
                validate={[required]}
              />

              <div className="form-group">
                <div htmlFor="vivo" className="control-label">Está vivo?</div>
                <div className="radio-inline">
                  <Field name="vivo" component="input" type="radio" value="S" checked /> Sim
                </div>
                <div className="radio-inline">
                  <Field name="vivo" component="input" type="radio" value="N" /> Não
                </div>
              </div>

              <Field
                id="peso"
                name="peso"
                label="Peso"
                component={TextField}
                type="text"
                className="form-control--decimal form-control"
                validate={[required]}
              />

              <Field
                label="Raça"
                name="raca"
                component={ComboField}
                className="form-control"
                validate={[required]}
              >
                <option value="">Selecione a raça do animal</option>
                {this.props.racas.map(raca => (
                  <option value={raca.codigo} key={raca.codigo}>
                    {raca.nome}
                  </option>
                ))}
              </Field>


              <Field
                label="Proprietário"
                name="proprietario"
                component={ComboField}
                className="form-control"
                validate={[required]}
              >
                <option value="">Selecione o proprietário do animal</option>
                {this.props.proprietarios.map(proprietario => (
                  <option value={proprietario.codigo} key={proprietario.codigo}>
                    {proprietario.nome} - (#{proprietario.codigo})
                  </option>
                ))}
              </Field>

            </div>
            <div className="col-xs-12 col-md-4">
              <div className="form-group">
                <div className="anima-form__foto">
                  <div htmlFor="fotoSeletor" className="control-label">Foto</div>
                  <Field name="foto" component="input" type="hidden" className="form-control" />
                  {this.renderAnimalFoto()}
                  <button onClick={this.onFotoButtonClick} className="btn btn-default btn-block">{ this.props.foto ? 'Alterar Foto' : 'Adicionar Foto' }</button>
                  <div className="hide">
                    <input
                      type="file"
                      id="animalFotoFile"
                      className="form-control"
                      name="foto"
                      onChange={e => this.handleFotoUpload(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="box-footer">
          <button type="submit" className="btn btn-success">Salvar</button>
          <button type="button" className="btn btn-default" onClick={() => this.props.history.push('/animais')}>Cancelar</button>
        </div>
      </form>
    );
  }
}

AnimalForm.propTypes = {
  proprietarios: PropTypes.instanceOf(Array).isRequired,
  racas: PropTypes.instanceOf(Array).isRequired,
  fotoUpload: PropTypes.func.isRequired,
};

const AnimalReduxForm = reduxForm({ form: 'animalForm', enableReinitialize: true })(AnimalForm);

const selector = formValueSelector('animalForm');

const mapStateToProps = state => ({
  foto: selector(state, 'foto'),
  nome: selector(state, 'nome'),
  vivo: selector(state, 'vivo'),
  peso: selector(state, 'peso'),
  raca: selector(state, 'raca'),
  proprietario: selector(state, 'proprietario'),
  racas: state.racas.list,
  proprietarios: state.proprietarios.list,
});

export default connect(mapStateToProps)(AnimalReduxForm);
