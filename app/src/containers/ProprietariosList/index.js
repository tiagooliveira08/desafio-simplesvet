import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ProprietariosAction } from '../../actions';
import { Page, PageHeader, Icon } from '../../components';

class ProprietariosList extends Component 
{
    componentWillMount()
    {
        this.props.fetchList();
    }

    renderRows()
    {
        const list = this.props.proprietarios || [];

        return list.map(item => (
            <tr key={ item.codigo }>
                <td>{ item.nome }</td>
                <td>{ item.email }</td>
                <td>{ item.telefone }</td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                <PageHeader title="Proprietários"/>
                <Page>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
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
    proprietarios: state.proprietarios.list,
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    ...ProprietariosAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProprietariosList);