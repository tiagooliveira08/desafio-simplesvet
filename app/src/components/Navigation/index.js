import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Icons from '@fortawesome/fontawesome-free-solid'

import './style.css';

export default props => (
    <div className="navigation">
        <div className="container">
            <ul className="navigation__list nav navbar-nav">
                <li className="navigation__item">
                    <a href="#/" className="navigation__item__link">
                        <FontAwesomeIcon icon={Icons.faHome}/> Início
                    </a>
                </li>
                <li className="navigation__item">
                    <a href="#/usuarios" className="navigation__item__link">
                        <FontAwesomeIcon icon={Icons.faUserMd}/>  Usuários
                    </a>
                </li>
                <li className="navigation__item">
                    <a href="#/proprietarios" className="navigation__item__link">
                        <FontAwesomeIcon icon={Icons.faUsers}/> Proprietários
                    </a>
                </li>
                <li className="navigation__item">
                    <a href="#/animais" className="navigation__item__link">
                        <FontAwesomeIcon icon={Icons.faPaw}/> Animais
                    </a>
                </li>
                <li className="navigation__item">
                    <a href="#/vacinas" className="navigation__item__link">
                        <FontAwesomeIcon icon={Icons.faMedkit}/> Vacinas
                    </a>
                </li>
                <li className="navigation__item">
                    <a onClick={props.onLogoutClick} className="navigation__item__link">
                        <FontAwesomeIcon icon={Icons.faSignOutAlt}/> Sair
                    </a>
                </li>
            </ul>
        </div>
    </div>
);