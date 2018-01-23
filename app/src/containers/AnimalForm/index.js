import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { UPLOADS_URL } from '../../services';
import { connect } from 'react-redux';

import './style.css';

class AnimalForm extends Component {
    constructor(props) {
        super(props);
        this.onFotoButtonClick = this.onFotoButtonClick.bind(this);
    }

    onFotoButtonClick(e) {
        e.preventDefault();
        document.getElementById('animalFotoFile').click();
    }

    renderAnimalFoto() {
        if(this.props.initialValues && this.props.initialValues.foto) {
            return (
                <img src={`${UPLOADS_URL}/${this.props.initialValues.foto}`} id="animalFotoPreview" alt="Foto do Animal"/>
            )
        }

        if(this.props.foto) {
            <img src={`${UPLOADS_URL}/${this.props.foto}`} id="animalFotoPreview" alt="Foto do Animal"/>
        }

        return false;
    }

    render() {
        return (
            <form onSubmit={ this.props.handleSubmit }>
                <div className="box-body">
                    <div className="row">
                        <div className="col-xs-12 col-md-8">
                            <div className="form-group">
                                <label htmlFor="nome" className="control-label">Nome</label>
                                <Field name="nome" component="input" type="text" placeholder="Informe o nome" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="vivo" className="control-label">Está vivo?</label>
                                <label className="radio-inline">
                                    <Field name="vivo" component="input" type="radio" value="S"/> Sim
                                </label>
                                <label className="radio-inline">
                                    <Field name="vivo" component="input" type="radio" value="N"/> Não
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="peso" className="control-label">Peso</label>
                                <Field name="peso" component="input" type="text" placeholder="Informe o Peso" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="raca" className="control-label">Raça</label>
                                <Field name="raca" component="select" className="form-control">
                                    <option value="">Selecione a raça do animal</option>
                                    {this.props.racas.map(raca => (
                                    <option value={raca.codigo} key={raca.codigo}>
                                        {raca.nome}
                                    </option>
                                    ))}
                                </Field>
                            </div>

                            <div className="form-group">
                                <label htmlFor="proprietario" className="control-label">Proprietário</label>
                                <Field name="proprietario" component="select" className="form-control">
                                    <option value="">Selecione o proprietário do animal</option>
                                    {this.props.proprietarios.map(proprietario => (
                                    <option value={proprietario.codigo} key={proprietario.codigo}>
                                        {proprietario.nome} - (#{proprietario.codigo})
                                    </option>
                                    ))}
                                </Field>
                            </div>

                        </div>
                        <div className="col-xs-12 col-md-4">
                            <div className="form-group">
                                <div className="anima-form__foto">
                                    <label htmlFor="fotoSeletor" className="control-label">Foto</label>
                                    <Field name="foto" component="input" type="hidden" className="form-control"/>
                                    {this.renderAnimalFoto()}
                                    <button onClick={this.onFotoButtonClick} className="btn btn-default btn-block">{ this.props.foto ? 'Alterar Foto' : 'Adicionar Foto' }</button>
                                    <div className="hide">
                                        <input type="file" id="animalFotoFile" className="form-control" name="foto" onChange={(e) => this.props.fotoUpload(e)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="box-footer">
                    <button type="submit" className={`btn btn-success`}>Salvar</button>
                    <button type="button" className="btn btn-default" onClick={ () => this.props.history.push(`/animais`) }>Cancelar</button>
                </div>
            </form>
        )
    }
}

AnimalForm = reduxForm({ form: 'animalForm', enableReinitialize: true })(AnimalForm);

const selector = formValueSelector('animalForm');

const mapStateToProps = state => ({
    foto: selector(state, 'foto'),
    nome: selector(state, 'nome'),
    vivo: selector(state, 'vivo'),
    peso: selector(state, 'peso'),
    raca: selector(state, 'raca'),
    proprietario: selector(state, 'proprietario'),
    racas: state.racas.list,
    proprietarios: state.proprietarios.list,
});

export default connect(mapStateToProps)(AnimalForm);