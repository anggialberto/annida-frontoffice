import React from 'react';
import './../pages_css/AboutPage.css';

import Card from '~components/Card/Card';
import activity1 from '../assets/images/activity1.jpeg';
import activity2 from '../assets/images/activity2.jpeg';


const AboutPage = () => {

  return (
    <>
      <div className={'about_page'}>
      <div className={'about_activity'}>
        <div className={'activity1'}>
          <Card>
            <h1>Profil TK Annida</h1>
            <img name="img-activity1" src={ activity1 } style={{ width:'50%', height: '50%', alignSelf:'center' }} ></img>
            <img name="img-activity2" src={ activity2 } style={{ width:'50%', height: '50%', alignSelf:'center' }}></img>
          </Card>
        </div>
      </div>
      <div className={'about_profile'}>
        <div className={'about_side_left'}></div>
        <div className={'about_profile_content'}>
          <h1>Profil</h1>
          <p>TK Annida merupakan Sekolah Islam Terpadu di Kota Tangerang Selatan. 
            Sejak dahulu TK Annida sangat diminati masyarakat, karena menanamkan pendidikan Agama Islam secara intensif. 
            TK Annida sekarang ini menggunakan Kurikulum 2013 dan Kurikulum Pendidikan Agama Islam. 
            Penanaman karakter pembiasaan islami yang sudah mengakar sejak dahulu yang terintegritas dengan program adiwiyata. 
            Kegiatan ekstrakuler berbagai jenis. Sebagai pilot project kurikulum 2006 dan sekolah Induk kurikulum 2013. 
            TK Annida juga sebagai sekolah Adiwiyata. TK Annida meraih segudang prestasi, baik itu di bidang akademik, non akademik, dan keagamaan. 
            Salah satunya juara robotic tingkat internasional, taek won do tingkat internasional, nasional dan provinsi, sains tingkat nasional, dan siswa teladan. 
            Alumni TK Annida banyak yang berprestasi dan sukses dalam segala bidang.</p>
        </div>
        <div className={'about_side_center'}></div>
        <div className={'about_profile_superiority'}>
          <h1>Keunggulan</h1>
          <p>
            01 Pembelajaran Multimedia <br></br>
            02 Bimbingan BTHQ secara intensif <br></br>
            03 Tahfidz Al-Qur'an <br></br>
            04 Pendidikan Karakter <br></br>
            05 Pembelajaran Bahasa Inggris Dasar <br></br>
            06 Sarana penunjang pembelajaran yang lengkap <br></br>
          </p>
        </div>
        <div className={'about_side_right'}></div>
      </div>
      <div className={'about_visionmission'}>
        <div className={'about_visionmission_left'}></div>
        <div className={'about_visionmission_right'}>
          <h2>
            Visi :<br></br>
            Membina akhlak meraih prestasi berwawasan global, berdasarkan imtak dan iptek, 
            dengan menghargai kearifan karakter budaya serta peduli lingkungan.
          </h2>
          <h2>
            Misi<br></br>
            <ul>
              <li>Terwujudnya pengembangan kurikulum yang adaptif dan proaktif.</li>
              <li>Terwujudnya pengembangan kurikulum yang adaptif dan proaktif.</li>
              <li>Terwujudnya pengembangan kurikulum yang adaptif dan proaktif.</li>
              <li>Terwujudnya pengembangan kurikulum yang adaptif dan proaktif.</li>
              <li>Terwujudnya pengembangan kurikulum yang adaptif dan proaktif.</li>
              <li>Terwujudnya pengembangan kurikulum yang adaptif dan proaktif.</li>
              <li>Terwujudnya pengembangan kurikulum yang adaptif dan proaktif.</li>
            </ul>
          </h2>
        </div>
      </div>
      <div className={'about_quote'}>
        <h1>Sekolah berkualitas dengan program pembelajaran yang berkualitas, sumber daya pengajar yang berkualitas, 
          dan sarana prasarana yang lengkap dan mutakhir</h1>
      </div>
      </div>
    </>
    )
}

export default AboutPage;