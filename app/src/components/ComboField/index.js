/* eslint react/prop-types: [2,
  { "ignore": ["meta", "meta.touched", "meta.error", "meta.warning", "field", "input", "children"] }] */

  import React, { Component } from 'react';
  import PropTypes from 'prop-types';
  import Inputmask from 'inputmask';

  class ComboField extends Component {
    render() {
      return (
        <div className="form-group">
          <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
          <div>
            <select
              className={this.props.className}
              {...this.props.input}
              {...this.props.field}
            >
              {this.props.children}
            </select>
            { this.props.meta.touched && (
                (this.props.meta.error &&
                  <span className="text-danger">{this.props.meta.error}</span>) ||
                (this.props.meta.warning &&
                  <span className="text-warning">{this.props.meta.warning}</span>)
            ) }
          </div>
        </div>
      );
    }
  }

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
