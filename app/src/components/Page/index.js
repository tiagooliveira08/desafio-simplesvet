import React from 'react';
import './style.css';

export default props => (
    <div className="page-content">
        <div className="container">
            <div className="page-box">
                {props.children}
            </div>
        </div>  
    </div>
);