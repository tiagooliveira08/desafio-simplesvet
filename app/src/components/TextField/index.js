/* eslint react/prop-types: [2,
  { "ignore": ["meta", "meta.touched", "meta.error", "meta.warning", "field", "input"] }] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Inputmask from 'inputmask';

class TextField extends Component {
  componentDidMount() {
    const isDecimal = {
      radixPoint: ',',
      groupSeparator: '.',
      autoGroup: true,
      digits: 3,
      digitsOptional: true,
      placeholder: '0',
      rightAlign: false,
      onBeforeMask(value) {
        return value;
      },
    };

    Inputmask('decimal', isDecimal).mask(document.querySelectorAll('.form-control--decimal'));
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        <div>
          <input
            className={this.props.className}
            {...this.props.input}
            {...this.props.field}
          />
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

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
};

TextField.defaultProps = {
  className: 'form-control',
};

export default TextField;
