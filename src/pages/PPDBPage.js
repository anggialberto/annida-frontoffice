import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm, Controller, get } from "react-hook-form";
import Card from '~components/Card/Card';
import FormInputWrapper from '~components/Form/FormInputWrapper/FormInputWrapper';
import FormLabel from '~components/Form/FormLabel/FormLabel';
import FormTextError from '~components/Form/FormTextError/FormTextError';
import FormWrapper from '~components/Form/FormWrapper/FormWrapper';
import Input from '~components/Form/Input/Input';
import PDBBWrapper from '~components/Wrapper/PDDB/PPDBBWrapper';
import TextArea from '~components/Form/Input/TextArea';
import RegistrationStatus from '~components/RegistrationStatus/RegistrationStatus';
import { Button, Modal } from 'antd';
import axios from 'axios';
import { getBase64 } from 'src/utils/file';
// import Modal from 'antd/lib/modal/Modal';


const PPDBPage = () => {
  const [religions, setReligions] = useState([]);
  const [schoolYears, setSchoolYears] = useState([]);

  const { control, trigger, getValues, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    shouldFocusError: true,
    defaultValues: {
      idNumber: '',
      fullname: '',
      nickname: '',
      birthPlace: '',
      birthDate: null,
      gender: '',
      bloodType: '',
      childStatus: '',
      address: '',

      fatherName: '',
      fatherEducation: '',
      fatherOccupation: '',
      fatherOccupationDesc: null,
      fatherAddress: '',

      motherName: '',
      motherEducation: '',
      motherOccupation: '',
      motherOccupationDesc: null,
      motherAddress: '',

      mutationIn: null,
      mutationOut: null,
      mutationOrigin: '',
      mutationTo: '',
      schoolYear: null,
      religion: null,

      group: '',
      birthCertificate: null,
      familyCard: null,

      proofOfPayment: null,

    }
  });

  useEffect(() => {
    getAllReligion();
    getAllSchoolYear();
  },[])

  const registration = async(data) => {
    const response = await axios.post('https://3801-180-252-172-105.ap.ngrok.io/annida/registration', data)
    console.log('response data', response);

  }

  const getRegistrationInfoById = async(id) => {
    const response = await axios.get(`https://3801-180-252-172-105.ap.ngrok.io/annida/monitoring/registration/${id}`);
    console.log('response getRegistrationInfoById', response);
  }


  const getAllReligion = async() => {
      const response = await axios.get('https://3801-180-252-172-105.ap.ngrok.io/annida/religion');
      if(response.status === 200) {
        const dataReligion = response.data.data.map((religion) => {
          return {
            value: religion.id,
            label: religion.name
          }
        })
        setReligions(dataReligion)
      }
      console.log('response religion', response);
  }

  const getAllSchoolYear = async() => {
    const response = await axios.get('https://3801-180-252-172-105.ap.ngrok.io/annida/school-year');
    if(response.status === 200) {
      const dataSchoolYear = response.data.data.map((schoolYear) => {
        return {
          value: schoolYear.id,
          label: schoolYear.content
        }
      })
      setSchoolYears(dataSchoolYear)
    }
}
  


  const onSubmit = async(data) => {
    let payload = structuredClone(data);
    const base64birthCertificate = await getBase64(data.birthCertificate);
    const base64familyCard = await getBase64(data.familyCard);

    payload = {
      ...payload,
      bloodType: data.bloodType.value,
      childStatus: data.childStatus.value,
      fatherEducation: data.fatherEducation.value,
      motherEducation: data.motherEducation.value,
      religion: { id: data.religion.value },
      schoolYear: { id: data.schoolYear.value },
      gender: data.gender.value,
      birthCertificate: {
        file:base64birthCertificate,
        name: data.birthCertificate.name,
        type:data.birthCertificate.type
      },
      familyCard: {
        file:base64familyCard,
        name: data.birthCertificate.name,
        type: data.birthCertificate.type
      },
      group: data.group.value,

    }
    await registration(payload);
    console.log('onSubmit', data);
  }

  return (
    <>
      <PDBBWrapper>
        <Card
          title={'Selamat Datang di PDBB TK Annida'}
          description={'Apabila anda telah melakukan pendaftaran, silahkan klik tombol "Cek Status Pendaftaran"'}
        >
          <button style={{ width: 'max-content' }} className={'btn btn--purple'}>Cek Status Pendaftaran</button>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)} >
          <Card
            title={'Data Diri Calon Pendaftar'}
          >
            <FormWrapper>
              <FormLabel>
                NIK
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="idNumber"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder={'NIK'} error={!!errors.idNumber} {...field} />}
                />
                {errors?.idNumber?.type === 'required' && <FormTextError>NIK Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Nama Lengkap
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="fullname"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder={'Nama Lengkap'} error={!!errors.fullname} {...field} />}
                />
                {errors?.fullname?.type === 'required' && <FormTextError>Nama Lengkap Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Nama Panggil
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="nickname"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder={'Nama Panggil'} error={!!errors.nickname} {...field} />}
                />
                {errors?.nickname?.type === 'required' && <FormTextError>Nama Panggil Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Tempat Lahir
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="birthPlace"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder={'Tempat Lahir'} error={!!errors.birthPlace} {...field} />}
                />
                {errors?.birthPlace?.type === 'required' && <FormTextError>Tempat Lahir Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Tanggal Lahir
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="birthDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input type={'date'} placeholder={'Tanggal Lahir'} error={!!errors.birthDate} {...field} />}
                />
                {errors?.birthDate?.type === 'required' && <FormTextError>Tanggal Lahir Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Agama
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="religion"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select placeholder={'Pilih Agama'}
                    {...field}
                    options={religions}
                  />}
                />
                {errors?.religion?.type === 'required' && <FormTextError>Agama Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Jenis Kelamin
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select placeholder={'Pilih jenis kelamin'}
                    {...field}
                    options={[
                      { value: "L", label: "Laki-Laki" },
                      { value: "P", label: "Perempuan" },
                    ]}
                  />}
                />
                {errors?.gender?.type === 'required' && <FormTextError>Jenis Kelamin Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Golongan Darah
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="bloodType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select placeholder={'Pilih golongan darah'}
                    {...field}
                    options={[
                      { value: "A", label: 'A' },
                      { value: "B", label: 'B' },
                      { value: "O", label: 'O' },
                      { value: "AB", label: 'AB' },
                    ]}
                  />}
                />
                {errors?.bloodType?.type === 'required' && <FormTextError>Golongan Darah Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Anak ke-
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="childStatus"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select placeholder={'Anak ke-'}
                    {...field}
                    options={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                      { value: "3", label: "3" },
                      { value: "4", label: "4" },
                      { value: "5", label: "5" },
                      { value: "6", label: "6" },
                    ]}
                  />}
                />
                {errors?.childStatus?.type === 'required' && <FormTextError>Anak ke- Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>


            <FormWrapper>
              <FormLabel>
                Alamat
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder={'Alamat'} error={!!errors.address} {...field} />}
                />
                {errors?.address?.type === 'required' && <FormTextError>Alamat Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Tahun Ajar
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="schoolYear"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select placeholder={'Pilih Tahun Ajar'}
                    {...field}
                    options={schoolYears}
                  />}
                />
                {errors?.gender?.type === 'required' && <FormTextError>Tahun Ajar Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Grup
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="group"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select placeholder={'Pilih grup'}
                    {...field}
                    options={[
                      { value: "TK A", label: "TK A" },
                      { value: "TK B", label: "TK B" },
                      { value: "TK C", label: "TK C" },
                    ]}
                  />}
                />
                {errors?.group?.type === 'required' && <FormTextError>Grup Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>


            <FormWrapper>
              <FormLabel>
                Tanggal Masuk
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="mutationIn"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input type={'date'} placeholder={'Tanggal Masuk'} error={!!errors.mutationIn} {...field} />}
                />
                {errors?.mutationIn?.type === 'required' && <FormTextError>Tanggal Masuk Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>


            <FormWrapper>
              <FormLabel>
                Tanggal Keluar
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="mutationOut"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input type={'date'} placeholder={'Tanggal Keluar'} error={!!errors.mutationOut} {...field} />}
                />
                {errors?.mutationOut?.type === 'required' && <FormTextError>Tanggal Keluar Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Pindahan dari
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="mutationOrigin"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder={'Pindahan dari'} error={!!errors.mutationOrigin} {...field} />}
                />
                {errors?.mutationOrigin?.type === 'required' && <FormTextError>Pindahan dari Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Pindahan ke
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="mutationTo"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder={'Pindahan ke'} error={!!errors.mutationTo} {...field} />}
                />
                {errors?.mutationTo?.type === 'required' && <FormTextError>Pindahan ke Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

          </Card>

          <Card
            title={'Data Orang Tua'}
          >
            <FormWrapper>
              <FormLabel>
                Nama Ayah
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="fatherName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder={'Nama Ayah'} error={!!errors.fatherName} {...field} />}
                />
                {errors?.fatherName?.type === 'required' && <FormTextError>Nama Aayah Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>


            <FormWrapper>
              <FormLabel>
                Alamat Ayah
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="fatherAddress"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder={'Alamat Ayah'} error={!!errors.fatherAddress} {...field} />}
                />
                {errors?.fatherAddress?.type === 'required' && <FormTextError>Alamat Ayah Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Pendidikan Ayah
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="fatherEducation"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select placeholder={'Pilih Pendidikan Ayah'}
                    {...field}
                    options={[
                      { value: "1", label: "SMA" },
                      { value: "2", label: "S1" },
                    ]}
                  />}
                />
                {errors?.fatherEducation?.type === 'required' && <FormTextError>Pendidikan Ayah Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>


            <FormWrapper>
              <FormLabel>
                Pekerjaan Ayah
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="fatherOccupation"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select placeholder={'Pilih pekerjaan ayah'}
                    {...field}
                    options={[
                      { value: "1", label: "Wirausaha" },
                      { value: "2", label: "Dokter" },
                      { value: "3", label: "Polisi" },
                      { value: "4", label: "Guru" },
                      { value: "5", label: "Tentara" },
                      { value: "6", label: "Pengacara" },
                      { value: "7", label: "Ibu Rumah Tangga" },
                      { value: "8", label: "Sekretaris" },
                    ]}
                  />}
                />
                {errors?.fatherOccupation?.type === 'required' && <FormTextError>Pekerjaan Ayah Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Deskripsi Pekerjaan Ayah
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="fatherOccupationDesc"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <TextArea placeholder={'PDeskripsi Pekerjaan Ayah'} error={!!errors.fatherOccupationDesc} {...field} />}
                />
                {errors?.fatherOccupationDesc?.type === 'required' && <FormTextError>Deskripsi Pekerjaan Ayah Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>


            {/* Mother */}
            <FormWrapper>
              <FormLabel>
                Nama Ibu
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="motherName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder={'Nama Ibu'} error={!!errors.motherName} {...field} />}
                />
                {errors?.motherName?.type === 'required' && <FormTextError>Nama Ibu Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>


            <FormWrapper>
              <FormLabel>
                Alamat Ibu
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="motherAddress"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder={'Alamat Ibu'} error={!!errors.motherAddress} {...field} />}
                />
                {errors?.motherAddress?.type === 'required' && <FormTextError>Alamat Ibu Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Pendidikan Ibu
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="motherEducation"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select placeholder={'Pilih Pendidikan Ibu'}
                    {...field}
                    options={[
                      { value: "1", label: "SMA" },
                      { value: "2", label: "S1" },
                    ]}
                  />}
                />
                {errors?.motherEducation?.type === 'required' && <FormTextError>Pendidikan Ibu Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>


            <FormWrapper>
              <FormLabel>
                Pekerjaan Ibu
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="motherOccupation"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select placeholder={'Pilih pekerjaan ibu'}
                    {...field}
                    options={[
                      { value: "1", label: "Wirausaha" },
                      { value: "2", label: "Dokter" },
                      { value: "3", label: "Polisi" },
                      { value: "4", label: "Guru" },
                      { value: "5", label: "Tentara" },
                      { value: "6", label: "Pengacara" },
                      { value: "7", label: "Ibu Rumah Tangga" },
                      { value: "8", label: "Sekretaris" },
                    ]}
                  />}
                />
                {errors?.motherOccupation?.type === 'required' && <FormTextError>Pekerjaan Ibu Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Deskripsi Pekerjaan Ibu
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="motherOccupationDesc"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <TextArea placeholder={'Deskripsi Pendidikan Ibu'} error={!!errors.motherOccupationDesc} {...field} />}
                />
                {errors?.motherOccupationDesc?.type === 'required' && <FormTextError>Deskripsi Pendidikan Ibu Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

          </Card>

          <Card
            title={'Dokumen'}
          >
            <FormWrapper>
              <FormLabel>
                Akte Kelahiran
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="birthCertificate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => <input type={'file'} placeholder={'Akte Kelahiran'} onChange={(e) => {
                    console.log('field birthCertificate', e.target.files[0]);
                    onChange(e.target.files[0])
                    // onChange(e)
                  }} />}
                />
                {errors?.birthCertificate?.type === 'required' && <FormTextError>Akte Kelahiran Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Kartu Keluarga
              </FormLabel>
              <FormInputWrapper>
              <Controller
                  name="familyCard"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => <input type={'file'} placeholder={'Kartu Keluarga'} onChange={(e) => {
                    console.log('field familyCard', e.target.files[0]);
                    console.log('form values', getValues());
                    onChange(e.target.files[0])
                    // onChange(e)
                  }} />}
                />
                {errors?.birthCertificate?.type === 'required' && <FormTextError>Kartu Keluarga Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

          </Card>

          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button shape='default' htmlType='submit' type='primary' onClick={() => trigger()} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 30}}>SUBMIT</Button>

          </div>

        </form>


      </PDBBWrapper>
      {/* <RegistrationStatus /> */}
      
      
    </>
  )
}

export default PPDBPage;