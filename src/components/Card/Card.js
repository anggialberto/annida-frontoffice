import React from 'react';
import './Card.scss';

const Card = ({title, description, children}) => {
    return (
        <div className={'card'}>
            <div className={'card__header'}>
                <h4 className={'card__title'}>
                    {title}
                </h4>
                <p>{description}</p>
            </div>
            <div className={'card__content'}>
                {children}
            </div>

        </div>
    )
}

export default Card;