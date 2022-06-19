import React from 'react';
import './FormTextError.scss';

const FormTextError = ({children}) => {
    return <p className={'form__text form__text--error'}>{children}</p>

}

export default FormTextError;