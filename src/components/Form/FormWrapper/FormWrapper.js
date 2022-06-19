import React from 'react';
import './FormWrapper.scss';

const FormWrapper = ({children}) => {
    return (
        <div className={'form__wrapper'}>
            {children}
        </div>
    )
}

export default FormWrapper;