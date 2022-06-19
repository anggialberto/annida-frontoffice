import React from 'react';
import classNames from 'classnames';
import './Input.scss';

const TextArea = (props,{placeholder, error}) => {
    return (
        <textarea style={{maxHeight: 150, height: 150}} {...props} className={classNames('input', {'input--error': props.error})} placeholder={placeholder}  />
    )

}

export default TextArea;