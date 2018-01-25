/* eslint react/prop-types: [2,
  { "ignore": [
    "history",
    "match"
  ] }] */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as animaisActions } from '../../redux/animais';
import { Page, PageHeader } from '../../components';
import { AnimalForm } from '../index';

class AnimaisEdit extends Component {
  componentWillMount() {
    this.props.getAnimalEntry(this.props.match.params.id);
  }

  render() {
    if (!this.props.animal.nome) {
      return false;
    }

    return (
      <div>
        <PageHeader title={`Editando Animal: ${this.props.animal.nome} (#${this.props.animal.codigo})`} />
        <Page>
          <AnimalForm
            initialValues={this.props.animal}
            fotoUpload={this.props.uploadAnimalImage}
            onSubmit={this.props.updateAnimal}
            history={this.props.history}
          />
        </Page>
      </div>
    );
  }
}

AnimaisEdit.propTypes = {
  animal: PropTypes.instanceOf(Object).isRequired,
  uploadAnimalImage: PropTypes.func.isRequired,
  updateAnimal: PropTypes.func.isRequired,
  getAnimalEntry: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  animal: state.animais.current,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...animaisActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimaisEdit);
