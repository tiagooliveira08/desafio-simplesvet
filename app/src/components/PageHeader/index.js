import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const PageHeader = props => (
  <div className="page-head">
    <div className="container">
      <div className="page-title">
        <h1>{props.title}</h1>
      </div>
      { props.children ? (<div className="page-title-right">{props.children}</div>) : ''}
    </div>
  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
};

PageHeader.defaultProps = {
  children: null,
};

export default PageHeader;
