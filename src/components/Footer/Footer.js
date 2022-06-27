import React from 'react';
import './Footer.css';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons'

const Footer = () => {
  return (
    <footer className={'footer'}>
      <div className={'footer__head'}>
        <span className={'head1'}>.</span>
        <span className={'head2'}>.</span>
        <span className={'head3'}>.</span>
        <span className={'head4'}>.</span>
        <span className={'head5'}>.</span>
        <span className={'head6'}>.</span>
        <span className={'head7'}>.</span>
      </div>
      <div className={'footer__content'}>
        <div className={'footer__content__main'}>
          <div className={'content__1'}>
            <b><h2>Annida Ul' Hasanah</h2></b>
            <p>TK Annida merupakan Sekolah Islam Terpadu di Kota Tangerang Selatan. Sejak dahulu TK Annida sangat diminati masyarakat, karena menanmkan pendidikan Agama Islam secara intensif.</p>
          </div>
          <div className={'content__2'}>
            <b><h2>Unit Pendidikan</h2></b>
            <p>
            KB<br></br>
            TK A<br></br>
            TK B<br></br>
            TK C<br></br>
            </p>
          </div>
          <div className={'content__3'}>
            <b><h2>Contact with us</h2></b>
            <br></br>
            <p>
              <PhoneOutlined style={{ fontSize: '20px', color:'#01a23c' }}/>&nbsp;&nbsp;<span class="info">021 7332828 &amp; 700 7099</span><br></br>
              <MailOutlined style={{ fontSize: '20px', color:'#01a23c' }}/>&nbsp;&nbsp;<span class="info">info@annida.com</span>
            </p>
          </div>
        </div>
      </div>
      <div className={'footer__copyright'}>
        <p>
          Copyright © 2022 <b>TK ANNIDA</b><br></br>
          Designed by <a><i>Annida Studio</i></a> Developed by TK ANNIDA
        </p>
      </div>
    </footer>
  )
}

export default Footer;