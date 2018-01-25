import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Page = props => (
  <div className="page-content">
    <div className="container">
      <div className="page-box">
        {props.children}
      </div>
    </div>
  </div>
);

Page.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Page;
