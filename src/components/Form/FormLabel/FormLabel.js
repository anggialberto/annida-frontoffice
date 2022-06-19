import React from 'react';
import './FormLabel.scss';

const FormLabel = ({children}) => {
    return (
        <label className={'form__label'}>
            {children}
        </label>
    )
}

export default FormLabel;