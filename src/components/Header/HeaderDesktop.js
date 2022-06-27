import React from 'react';
import {Link} from 'react-router-dom';
// import Logo from '~assets/images/logo-annida.png'
import Logo from '~assets/images/logo-annida-green-nobg.png'
import classNames from 'classnames';


const HeaderDesktop = () => {
  return (
    <div className={'header__container'}>
      <div className={'header__content__wrapper'}>
        <div className={'header__container__logo'}>
          <a href='/'></a>
          <img src={Logo} alt={'logo-tk-annida'} style={{height: '100px'}} />
        </div>
        <div className={'header__menu'}>
          <ul className={'header__menu__item__wrapper'}>
            <li className={'header__menu__item'}>
              <Link to={'/'}>Beranda</Link>
            </li>
            <li className={'header__menu__item'}>
              <Link to={'/about'}>Profile</Link>
            </li>
            <li className={'header__menu__item'}>
              <Link to={'/ppdb'}>PPDB</Link>
            </li>
          </ul>
        </div>
    
      </div>
     

    </div>
  )
};

export default React.memo(HeaderDesktop);