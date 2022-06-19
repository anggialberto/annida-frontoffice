import React from 'react';
import './FormInputWrapper.scss';

const FormInputWrapper = ({children}) => {
    return (
        <div className={'form__input__wrapper'}>
            {children}
        </div>
    )

}

export default FormInputWrapper;