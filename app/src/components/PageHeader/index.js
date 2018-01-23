import React from 'react';
import './style.css';

export default props => (
    <div className="page-head">
        <div className="container">
            <div className="page-title">
                <h1>{props.title}</h1>
            </div>
            { props.children ? (<div className="page-title-right">{props.children}</div>) : ''}
        </div>
    </div>
);