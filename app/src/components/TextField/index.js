import React from 'react';

export default props => (
    <div className="form-group has-feedback">
        <label htmlFor={ props.name }>{ props.label }</label>
        <input 
            type={ props.type }
            readOnly={ props.readOnly }
            placeholder={ props.placeholder }
            className='form-control'
            {...props.input } />    
        <span className={`glyphicon glyphicon-${ props.icon } form-control-feedback`} ></span>
    </div>
);