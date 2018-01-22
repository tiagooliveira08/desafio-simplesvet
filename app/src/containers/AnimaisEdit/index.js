import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';

import { AnimaisAction } from '../../actions';
import { Page, PageHeader, AnimalForm } from '../../components';

class AnimaisEdit extends Component 
{
    componentWillMount()
    {
        this.props.fetchAnimailData(this.props.match.params.id);

        this.fotoUpload = this.fotoUpload.bind(this);
    }

    fotoUpload(e) {
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
                    <AnimalForm initialValues={animal} additionalData={{ racas, proprietarios }} fotoUpload={this.fotoUpload} />
                </Page>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    animal: state.animais.current,
    racas: state.racas.list,
    proprietarios: state.proprietarios.list,
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    ...AnimaisAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimaisEdit);