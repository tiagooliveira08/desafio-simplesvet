import React from 'react';
import './style.css';
import logo from '../../images/logo-simplesvet.png';

export default props => (
    <div className="header">
        <div className="container">
            <div className="header__logo">
                <a href="#/" className="header__logo__link">
                    <img src={logo} alt="logo" className="header__logo__image" />
                </a>
            </div>
            <a href="" className="header__menu-toggler">Abrir Menu</a>
        </div>
    </div>
);