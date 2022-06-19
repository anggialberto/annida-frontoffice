import React from 'react';
import './PDBBWrapper.scss';

const PDBBWrapper = ({children}) => {
    return (
        <div className={'pdbb-wrapper'}>
            {children}
        </div>
    )
}

export default PDBBWrapper;