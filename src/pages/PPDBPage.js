import React from 'react';
import Select from 'react-select';
import { useForm, Controller } from "react-hook-form";
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
// import Modal from 'antd/lib/modal/Modal';


const PPDBPage = () => {
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

      birthCertificate: null,
      familyCard: null,

      proofOfPayment: null,

    }
  });


  const onSubmit = data => console.log('onSubmit', data);

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
                  render={({ field }) => <Input placeholder={'Pekerjaan Ayah'} error={!!errors.fatherOccupation} {...field} />}
                />
                {errors?.fatherOccupation?.type === 'required' && <FormTextError>Pekerjaan Ayah Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Deskripsi Pendidikan Ayah
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="fatherOccupationDesc"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <TextArea placeholder={'PDeskripsi Pendidikan Ayah'} error={!!errors.fatherOccupationDesc} {...field} />}
                />
                {errors?.fatherOccupationDesc?.type === 'required' && <FormTextError>Deskripsi Pendidikan Ayah Wajib diisi</FormTextError>}
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
                  render={({ field }) => <Input placeholder={'Pekerjaan Ibu'} error={!!errors.motherOccupation} {...field} />}
                />
                {errors?.motherOccupation?.type === 'required' && <FormTextError>Pekerjaan Ibu Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Deskripsi Pendidikan Ibu
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
                <input onChange={(event) => {
                  console.log('familyCard', event);
                  console.log('form', getValues());
                }} type={'file'} placeholder={'Kartu Keluarga'} />
                {errors?.familyCard?.type === 'required' && <FormTextError>Kartu Keluarga Wajib diisi</FormTextError>}
              </FormInputWrapper>
            </FormWrapper>

          </Card>

          <Button type='submit' onClick={() => trigger()}>SUBMIT</Button>
        </form>


      </PDBBWrapper>
      {/* <RegistrationStatus /> */}
      
      
    </>
  )
}

export default PPDBPage;