import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, HashRouter as Router } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './style.css';

import { service } from '../../service';
import { actions as authActions } from '../../redux/auth';
import { Navigation } from '../../components';
import { logo } from '../../images';

import {
  Home,
  Login,
  AnimaisList,
  AnimaisEdit,
  UsuariosList,
  ProprietariosList,
  AnimaisCreate,
  VacinacaoList,
  VacinacaoCreate,
} from '../index';

class SimplesVet extends Component {
  componentWillMount() {
    if (this.props.auth.user) { this.props.validate(this.props.auth.user.token); }
  }

  render() {
    const { user, validToken } = this.props.auth;

    if (user && validToken) {
      service.setHeader('Authorization', `Bearer ${user.token}`);

      return (
        <div className="app">
          <ReduxToastr />
          <div className="header">
            <div className="container">
              <div className="header__logo">
                <a href="#/" className="header__logo__link">
                  <img src={logo} alt="logo" className="header__logo__image" />
                </a>
              </div>
              <a href="#/" className="header__menu-toggler">Abrir Menu</a>
            </div>
          </div>
          <Navigation onLogoutClick={() => this.props.logout()} />
          <div className="page-container">
            <Router>
              <div>
                <Route path="/" component={Home} exact />
                <Route path="/animais" component={AnimaisList} exact />
                <Route path="/novo-animal" component={AnimaisCreate} exact />
                <Route path="/animais/:id" component={AnimaisEdit} exact />
                <Route path="/usuarios" component={UsuariosList} exact />
                <Route path="/proprietarios" component={ProprietariosList} exact />
                <Route path="/vacinacao" component={VacinacaoList} exact />
                <Route path="/nova-vacinacao" component={VacinacaoCreate} exact />
              </div>
            </Router>
          </div>
          <div className="footer">
            <div className="page-prefooter" />
            <div className="page-footer">
              <div className="container">2016 &copy; SimplesVet</div>
            </div>
          </div>
        </div>
      );
    }

    if (!user && !validToken) { return <Login />; }

    return false;
  }
}

SimplesVet.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
  validate: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch => bindActionCreators({ ...authActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SimplesVet);
