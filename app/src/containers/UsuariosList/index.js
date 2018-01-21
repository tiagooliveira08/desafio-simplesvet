import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UsuariosAction } from '../../actions';
import { Page, PageHeader, Icon } from '../../components';

class UsuariosList extends Component 
{
    componentWillMount()
    {
        this.props.fetchList();
    }

    renderRows()
    {
        const list = this.props.usuarios || [];

        return list.map(item => (
            <tr key={ item.codigo }>
                <td>{ item.nome }</td>
                <td>{ item.email }</td>
                <td>{ item.user_status }</td>
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
                <PageHeader title="Usuários"/>
                <Page>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Status</th>
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
    usuarios: state.usuarios.list,
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    ...UsuariosAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsuariosList);