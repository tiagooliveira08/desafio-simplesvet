import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, HashRouter as Router } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr'

import { AuthAction } from '../../actions';
import { Header, Footer, Navigation } from '../../components';
import { service } from '../../services';

import { 
    Home, 
    Login, 
    AnimaisList, 
    AnimaisEdit,
    UsuariosList, 
    ProprietariosList, 
    AnimaisCreate,
} from '../index';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './style.css';

class SimplesVet extends Component 
{
    componentWillMount() 
    {
        if(this.props.auth.user)
            this.props.validate(this.props.auth.user.token);
    }

    render() 
    {
        const { user, validToken } = this.props.auth;
        
        if(user && validToken) {
            service.setHeader('Authorization', 'Bearer ' + user.token);

            return (
                <div className="app">
                    <ReduxToastr />
                    <Header />
                    <Navigation onLogoutClick={() => this.props.logout() } />
                    <div className="page-container">
                        <Router>
                            <div>
                                <Route path="/" component={ Home } exact/>
                                <Route path="/animais" component={ AnimaisList } exact />
                                <Route path="/novo-animal" component={ AnimaisCreate } exact />
                                <Route path="/animais/:id" component={ AnimaisEdit } exact />
                                <Route path="/usuarios" component={ UsuariosList } exact />
                                <Route path="/proprietarios" component={ ProprietariosList } exact />
                            </div>
                        </Router>
                    </div>
                    <Footer />
                </div>
            );
        }

        if(!user && !validToken)
            return <Login />

        return false;
    }
}

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch => bindActionCreators({ ...AuthAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SimplesVet);