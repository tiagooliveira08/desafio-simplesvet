import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AnimaisAction } from '../../actions';
import { Page, PageHeader, Icon } from '../../components';

class AnimaisList extends Component 
{
    componentWillMount()
    {
        this.props.fetchAnimaisData();
    }

    findRaca(codigo_raca)
    {
        const raca = this.props.racas.find(item => item.codigo === codigo_raca);

        return (raca) ? raca.nome : false;
    }

    findProprietario(codigo_proprietario)
    {
        const proprietario = this.props.proprietarios.find(item => item.codigo === codigo_proprietario);

        return (proprietario) ? proprietario.nome : false;
    }

    renderRows()
    {
        const list = this.props.animais || [];

        return list.map(item => (
            <tr key={ item.codigo }>
                <td>{ item.nome }</td>
                <td>{ item.vivo }</td>
                <td>{ item.peso }</td>
                <td>{ this.findRaca(item.raca) }</td>
                <td>{ this.findProprietario(item.proprietario) }</td>
                <td>
                    <Icon color="warning" onClick={() => this.props.history.push(`/animais/${item.codigo}`) } icon="faPencilAlt" />
                    <Icon color="danger" onClick={() => this.props.deleteAnimal(item.codigo) } icon="faTrashAlt" />
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <PageHeader title="Animais"/>
                <Page>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Vivo</th>
                                <th>Peso</th>
                                <th>Raça</th>
                                <th>Proprietário</th>
                                <th className="table-actions">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderRows()}
                        </tbody>
                    </table>
                </Page>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    animais: state.animais.list,
    racas: state.racas.list,
    proprietarios: state.proprietarios.list,
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    ...AnimaisAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnimaisList);