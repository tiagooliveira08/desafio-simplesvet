import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AnimaisAction } from '../../actions';
import { Page, PageHeader, Icon } from '../../components';

class List extends Component 
{
    componentWillMount()
    {
        this.props.fetchList();
    }

    renderRows()
    {
        const list = this.props.list || [];

        return list.map(item => (
            <tr key={ item.codigo }>
                <td>{ item.nome }</td>
                <td>{ item.vivo }</td>
                <td>{ item.peso }</td>
                <td>{ item.raca }</td>
                <td>{ item.proprietario }</td>
                <td>
                    <Icon color="warning" onClick={() => false } icon="faPencilAlt" />
                    <Icon color="danger" onClick={() => false } icon="faTrashAlt" />
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

const mapStateToProps = state => ({ ...state.animais })
const mapDispatchToProps = dispatch => bindActionCreators({ 
    ...AnimaisAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(List)