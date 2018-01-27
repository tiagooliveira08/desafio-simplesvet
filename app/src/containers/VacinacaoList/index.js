/* eslint react/prop-types: [2,
  { "ignore": ["history"] }] */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as vacinasActions } from '../../redux/vacinas';
import { Page, PageHeader, Icon } from '../../components';

class VacinasList extends Component {
  componentWillMount() {
    this.props.getScheduledVacinasList();
  }

  findAnimal(codigo) {
    const animal = this.props.animais.find(item => item.codigo === codigo);

    return (animal) ? animal.nome : false;
  }

  findVacina(codigo) {
    const vacina = this.props.vacinas.find(item => item.codigo === codigo);

    return (vacina) ? vacina.nome : false;
  }

  findUsuario(codigo) {
    const usuario = this.props.usuarios.find(item => item.codigo === codigo);

    return (usuario) ? usuario.nome : false;
  }

  formatDate(date) {
    if (!date) return '';

    const d = new Date(date.replace(/-/g, '/'));

    return d.toLocaleDateString();
  }

  renderRows() {
    const list = this.props.scheduled || [];

    if (list.length === 0) {
      return (
        <tr>
          <td colSpan="6"><p>Nenhuma vacinação programada</p></td>
        </tr>
      );
    }

    return list.map(item => (
      <tr key={item.codigo}>
        <td>{ item.codigo }</td>
        <td>{ this.findAnimal(item.codigo_animal) }</td>
        <td>{ this.findVacina(item.codigo_vacina) }</td>
        <td>{ this.formatDate(item.data_programacao) }</td>
        <td>{ this.formatDate(item.data_aplicacao) }</td>
        <td>{ this.findUsuario(item.codigo_usuario) }</td>
        <td style={{ width: '150px' }}>
          <Icon
            color="success"
            onClick={() => {
              this.props.applyVacina({
                codigo: item.codigo,
                usuario: this.props.usuario,
                animal: item.codigo_animal,
              });
            }}
            icon="faCheck"
            hide={item.data_aplicacao}
          />
          <Icon
            color="danger"
            onClick={() => this.props.deleteScheduledVacina(item.codigo)}
            icon="faTrashAlt"
          />
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <PageHeader title="Vacinação">
          <button className="btn btn-default pull-right" onClick={() => this.props.history.push('/nova-vacinacao')}>Agendar Nova Vacinação</button>
        </PageHeader>
        <Page>
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Animal</th>
                <th>Vacina</th>
                <th>Data Programação</th>
                <th>Data Aplicação</th>
                <th>Usuário</th>
                <th className="table-actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              { this.renderRows()}
            </tbody>
          </table>
        </Page>
      </div>
    );
  }
}

VacinasList.propTypes = {
  scheduled: PropTypes.instanceOf(Array).isRequired,
  animais: PropTypes.instanceOf(Array).isRequired,
  vacinas: PropTypes.instanceOf(Array).isRequired,
  usuarios: PropTypes.instanceOf(Array).isRequired,
  getScheduledVacinasList: PropTypes.func.isRequired,
  deleteScheduledVacina: PropTypes.func.isRequired,
  applyVacina: PropTypes.func.isRequired,
  usuario: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  scheduled: state.vacinas.scheduled,
  vacinas: state.vacinas.list,
  animais: state.animais.list,
  usuarios: state.usuarios.list,
  usuario: state.auth.user.usuario.id,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...vacinasActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VacinasList);
