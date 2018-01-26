/* eslint react/prop-types: [2,
  { "ignore":
    [
      "meta",
      "meta.touched",
      "meta.error",
      "meta.warning",
      "field",
      "input",
      "children"] }] */

import React from 'react';
import PropTypes from 'prop-types';

const ComboField = props => (
  <div className="form-group">
    <div htmlFor={props.id} className="control-label">{props.label}</div>
    <div>
      <select
        className={props.className}
        {...props.input}
        {...props.field}
      >
        {props.children}
      </select>
      { props.meta.touched && (
          (props.meta.error &&
            <span className="text-danger">{props.meta.error}</span>) ||
          (props.meta.warning &&
            <span className="text-warning">{props.meta.warning}</span>)
      ) }
    </div>
  </div>
);

ComboField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
};

ComboField.defaultProps = {
  className: 'form-control',
};

export default ComboField;
