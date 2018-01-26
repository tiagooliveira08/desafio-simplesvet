
/* eslint react/prop-types: [2,
  { "ignore": [
    "history",
  ] }] */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as vacinasActions } from '../../redux/vacinas';
import { Page, PageHeader } from '../../components';
import Form from './Form';

class VacinacaoCreate extends Component {
  componentWillMount() {
    this.props.getVacinasData();
  }

  render() {
    return (
      <div>
        <PageHeader title="Agendar Vacinação" />
        <Page>
          <Form
            onSubmit={this.props.scheduleVacina}
            initialValues={{ usuario: this.props.usuario }}
          />
        </Page>
      </div>
    );
  }
}

VacinacaoCreate.propTypes = {
  getVacinasData: PropTypes.func.isRequired,
  scheduleVacina: PropTypes.func.isRequired,
  usuario: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  usuario: state.auth.user.usuario.id,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...vacinasActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VacinacaoCreate);
