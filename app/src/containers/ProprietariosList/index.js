import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as proprietariosActions } from '../../redux/proprietarios';
import { Page, PageHeader } from '../../components';

class ProprietariosList extends Component {
  componentWillMount() {
    this.props.getProprietariosList();
  }

  renderRows() {
    const list = this.props.proprietarios || [];

    if (list.length === 0) {
      return (
        <p>Proprietários não encontrados</p>
      );
    }

    return list.map(item => (
      <tr key={item.codigo}>
        <td>{ item.nome }</td>
        <td>{ item.email }</td>
        <td>{ item.telefone }</td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <PageHeader title="Proprietários" />
        <Page>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
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

ProprietariosList.propTypes = {
  getProprietariosList: PropTypes.func.isRequired,
  proprietarios: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  proprietarios: state.proprietarios.list,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...proprietariosActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProprietariosList);
