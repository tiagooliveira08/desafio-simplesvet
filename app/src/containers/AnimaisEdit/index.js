import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AnimaisAction } from '../../actions';
import { Page, PageHeader } from '../../components';
import { AnimalForm } from '../index';

class AnimaisEdit extends Component 
{
    componentWillMount()
    {
        this.props.fetchAnimailData(this.props.match.params.id);
        this.handleFotoUpload = this.handleFotoUpload.bind(this);
    }

    handleFotoUpload(e) {
        const file = e.target.files[0];
        this.props.uploadAnimalImage(file);
    }

    render() {
        if(!this.props.animal.nome){
            return false;
        }

        const { animal, racas, proprietarios } = this.props;

        return (
            <div>
                <PageHeader title={`Editando Animal: ${animal.nome} (#${animal.codigo})`}/>
                <Page>
                    <AnimalForm 
                        initialValues={animal} 
                        additionalData={{ racas, proprietarios }} 
                        fotoUpload={this.handleFotoUpload} 
                        onSubmit={this.props.updateAnimal}
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

const mapDispatchToProps = dispatch => bindActionCreators({ ...AnimaisAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimaisEdit);