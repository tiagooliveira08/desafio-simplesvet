import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Icons from '@fortawesome/fontawesome-free-solid';
import PropTypes from 'prop-types';

import './style.css';

const Icon = props => (
  <button type="button" className={`icon-btn btn btn-${props.color} ${(props.hide && 'hide')}`} onClick={props.onClick}>
    <FontAwesomeIcon icon={Icons[props.icon]} />
  </button>
);

Icon.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  hide: PropTypes.bool,
};

Icon.defaultProps = {
  hide: false,
};

export default Icon;
