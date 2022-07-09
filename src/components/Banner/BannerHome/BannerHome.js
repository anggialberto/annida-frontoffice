import React from 'react';
import {Link} from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './BannerHome.scss';


const BannerHome = () => {
  return (
    <Carousel
      showArrows={false}
      autoPlay={true}
      showThumbs={false}
      showIndicators={true}
      showStatus={false}
      infiniteLoop={true}
    >
      <div style={{ background: `url('/images/bg-cloud2.png')` }}>
        <div className={'banner__container'}>
          <h1 className={'banner__text'}>Selamat Datang di situs Resmi</h1>
          <h1 className={'banner__text'}>TK Annida</h1>
          <img src="/images/slide1.png" />
        </div>

      </div>
      <div style={{ background: `url('/images/bg-cloud1.png')` }}>
        <div className={'banner__container'}>
          <div className={'banner__content'}>
            <img src="/images/slide2.png" style={{ height: 'auto', maxWidth: '100%' }} />
            <div className={'banner__ppdb__navigation'}>
              <h1>PPDB TK ANNIDA</h1>
              <Link to={'/ppdb'} className='btn btn--green btn--with-shadow'>DAFTAR SEKARANG</Link>
              {/* <a className='btn btn--green btn--with-shadow'>DAFTAR SEKARANG</a> */}
            </div>
          
          </div>
        </div>
      </div>
    </Carousel>
  );
}

export default BannerHome;