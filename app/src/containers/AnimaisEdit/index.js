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
        this.props.getAnimalEntry(this.props.match.params.id);
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

        return (
            <div>
                <PageHeader title={`Editando Animal: ${this.props.animal.nome} (#${this.props.animal.codigo})`}/>
                <Page>
                    <AnimalForm 
                        initialValues={this.props.animal} 
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