import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AnimaisAction, ProprietariosAction, RacasAction } from '../../actions';
import { Page, PageHeader } from '../../components';
import { AnimalForm } from '../index';

class AnimaisCreate extends Component 
{
    componentWillMount()
    {
        this.props.getProprietariosList();
        this.props.getRacasList();
        this.props.cleanCurrentAnimal();
        this.handleFotoUpload = this.handleFotoUpload.bind(this);
    }

    handleFotoUpload(e) {
        const file = e.target.files[0];
        this.props.uploadAnimalImage(file);
    }

    render() {
        return (
            <div>
                <PageHeader title={`Novo Animal`}/>
                <Page>
                    <AnimalForm 
                        initialValues={this.props.animal} 
                        fotoUpload={this.handleFotoUpload} 
                        onSubmit={this.props.createAnimal}
                        history={this.props.history}
                    />
                </Page>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    animal: state.animais.current
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...AnimaisAction, ...RacasAction, ...ProprietariosAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimaisCreate);