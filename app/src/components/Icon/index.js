import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Icons from '@fortawesome/fontawesome-free-solid'

export default props => (
    <button type="button" className={`btn btn-${props.color}`} onClick={ props.onClick }>
        <FontAwesomeIcon icon={Icons[props.icon]}/>
    </button>
);