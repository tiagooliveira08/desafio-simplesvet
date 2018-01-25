
/* eslint react/prop-types: [2,
  { "ignore": [
    "history",
  ] }] */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as animaisActions } from '../../redux/animais';

import { Page, PageHeader } from '../../components';
import { AnimalForm } from '../index';

class AnimaisCreate extends Component {
  componentWillMount() {
    this.props.cleanCurrentAnimal();
  }

  render() {
    return (
      <div>
        <PageHeader title="Novo Animal" />
        <Page>
          <AnimalForm
            initialValues={this.props.animal}
            fotoUpload={this.props.uploadAnimalImage}
            onSubmit={this.props.createAnimal}
            history={this.props.history}
          />
        </Page>
      </div>
    );
  }
}

AnimaisCreate.propTypes = {
  cleanCurrentAnimal: PropTypes.func.isRequired,
  animal: PropTypes.instanceOf(Object).isRequired,
  uploadAnimalImage: PropTypes.func.isRequired,
  createAnimal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  animal: state.animais.current,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...animaisActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimaisCreate);
