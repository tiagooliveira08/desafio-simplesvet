/* eslint react/prop-types: [2,
  { "ignore": ["history"] }] */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { UPLOADS_URL } from '../../service';
import { actions as AnimaisActions } from '../../redux/animais';

import { Page, PageHeader, Icon } from '../../components';

import './style.css';

class AnimaisList extends Component {
  componentWillMount() {
    this.props.getAnimalList();
  }

  findRaca(codigo) {
    const raca = this.props.racas.find(item => item.codigo === codigo);

    return (raca) ? raca.nome : false;
  }

  findProprietario(codigo) {
    const proprietario = this.props.proprietarios.find(item => item.codigo === codigo);

    return (proprietario) ? proprietario.nome : false;
  }

  renderRows() {
    const list = this.props.animais || [];

    if (list.length === 0) {
      return (
        <p>Usuários não encontrados</p>
      );
    }

    return list.map(item => (
      <tr key={item.codigo}>
        <td className="animal__list__foto">
          {item.foto ? <img src={`${UPLOADS_URL}/${item.foto}`} alt={`Foto de ${item.nome}`} className="animal__list__foto" /> : 'Sem Foto'}
        </td>
        <td>{ item.nome }</td>
        <td>{ item.vivo }</td>
        <td>{ item.peso }</td>
        <td>{ this.findRaca(item.raca) }</td>
        <td>{ this.findProprietario(item.proprietario) }</td>
        <td style={{ width: '150px' }}>
          <Icon
            color="warning"
            onClick={() => this.props.history.push(`/animais/${item.codigo}`)}
            icon="faPencilAlt"
          />
          <Icon
            color="danger"
            onClick={() => this.props.deleteAnimal(item.codigo)}
            icon="faTrashAlt"
          />
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <PageHeader title="Animais">
          <button className="btn btn-default pull-right" onClick={() => this.props.history.push('/novo-animal')}>Cadastrar um animal</button>
        </PageHeader>
        <Page>
          <table className="table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>Vivo</th>
                <th>Peso</th>
                <th>Raça</th>
                <th>Proprietário</th>
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

AnimaisList.propTypes = {
  getAnimalList: PropTypes.func.isRequired,
  racas: PropTypes.instanceOf(Object).isRequired,
  proprietarios: PropTypes.instanceOf(Object).isRequired,
  animais: PropTypes.instanceOf(Object).isRequired,
  deleteAnimal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  animais: state.animais.list,
  racas: state.racas.list,
  proprietarios: state.proprietarios.list,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...AnimaisActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimaisList);
