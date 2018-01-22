import React from 'react';
import { TextField } from '../index';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { UPLOADS_URL } from '../../services';

import './style.css';

let Form = props => {
    function onAlterarFotoButtonClick(e) {
        e.preventDefault();
        document.getElementById('animalFotoFile').click();
    }

    function getFileUrl(file) {
        return `${UPLOADS_URL}/${file}`;
    }

    return (
        <form role="form" onSubmit={ () => false }>
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
                                {props.additionalData.racas.map(raca => (
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
                                {props.additionalData.proprietarios.map(proprietario => (
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
                                <img src={getFileUrl(props.initialValues.foto)} id="animalFotoPreview"/>
                                <button onClick={onAlterarFotoButtonClick} className="btn btn-default btn-block">Alterar Foto</button>
                                <div className="hide">
                                    <input type="file" id="animalFotoFile" className="form-control" name="foto" onChange={(e) => props.fotoUpload(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="box-footer">
                <button type="submit" className={`btn btn-success`}>Salvar</button>
                <button type="button" className="btn btn-default" onClick={ () => false }>Cancelar</button>
            </div>
        </form>
    );
}

Form = reduxForm({ form: 'animalForm', destroyOnUnmount: false })(Form);

export default Form;