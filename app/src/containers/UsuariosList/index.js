import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as usuariosActions } from '../../redux/usuarios';
import { Page, PageHeader } from '../../components';

class UsuariosList extends Component {
  componentWillMount() {
    this.props.getUsuariosList();
  }

  renderRows() {
    const list = this.props.usuarios || [];

    if (list.length === 0) {
      return (
        <p>Usuários não encontrados</p>
      );
    }

    return list.map(item => (
      <tr key={item.codigo}>
        <td>{ item.nome }</td>
        <td>{ item.email }</td>
        <td>{ (item.user_status === 'A') ? 'Ativo' : 'Inativo' }</td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <PageHeader title="Usuários" />
        <Page>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Status</th>
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

UsuariosList.propTypes = {
  getUsuariosList: PropTypes.func.isRequired,
  usuarios: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  usuarios: state.usuarios.list,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...usuariosActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsuariosList);
