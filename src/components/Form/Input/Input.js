import React from 'react';
import classNames from 'classnames';
import './Input.scss';

const Input = (props,{placeholder, error}) => {
    return (
        <input {...props} className={classNames('input', {'input--error': props.error})} placeholder={placeholder}  />
    )

}

export default Input;