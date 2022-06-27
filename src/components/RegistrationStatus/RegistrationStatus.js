import React, { useEffect, useState } from 'react';
import { Button, Modal, Steps, Tag } from 'antd';
import './RegistrationStatus.scss';
import PDBBWrapper from '~components/Wrapper/PDDB/PPDBBWrapper';
import Card from '~components/Card/Card';
import { Controller, useForm } from 'react-hook-form';
import FormWrapper from '~components/Form/FormWrapper/FormWrapper';
import FormInputWrapper from '~components/Form/FormInputWrapper/FormInputWrapper';
import FormTextError from '~components/Form/FormTextError/FormTextError';
import FormLabel from '~components/Form/FormLabel/FormLabel';
import TextArea from '~components/Form/Input/TextArea';
import Input from '~components/Form/Input/Input';
import Select from 'react-select';
import axios from 'axios';
import { CHILD_STATUS, EDUCATION, OCCUPATION } from '~constants/local';
import { downloadFile, getBase64 } from 'src/utils/file';

const { Step } = Steps;

const RegistrationStatus = (props) => {
  const { control, trigger, getValues, setValue, handleSubmit, formState: { errors } } = useForm({
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
  const [religions, setReligions] = useState([]);
  const [schoolYears, setSchoolYears] = useState([]);
  const [birthCertificateName, setBirthCertificateName] = useState('akte-kelahiran')
  const [familyCardName, setFamilyCardName] = useState('kartu-keluarga')



  useEffect(() => {
    getAllReligion();
    getAllSchoolYear();
  }, []);

  useEffect(() => {
    if(props?.data) {
      setBirthCertificateName(getValues('birthCertificate')?.name);
      setFamilyCardName(getValues('familyCard')?.name)
      setValue('fullname', props.data.studentRegistration.fullname)
      setValue('idNumber', props.data.studentRegistration.idNumber)
      setValue('nickname', props.data.studentRegistration.nickname)
      setValue('birthPlace', props.data.studentRegistration.birthPlace)
      setValue('birthDate', props.data.studentRegistration.birthDate)
      setValue('childStatus', CHILD_STATUS[props.data.studentRegistration.childStatus])

      setValue('religion', {
        value: props.data.studentRegistration.religion.id,
        label: props.data.studentRegistration.religion.name
      })
      setValue('gender', {
        value: props.data.studentRegistration.gender,
        label: props.data.studentRegistration.gender === 'L' ? 'Laki-Laki' : 'Perempuan'
      })

      setValue('bloodType', {
        value: props.data.studentRegistration.bloodType,
        label: props.data.studentRegistration.bloodType
      })

      setValue('address', props.data.studentRegistration.address)
      setValue('schoolYear', {
        value: props.data.studentRegistration.schoolYear.id,
        label: props.data.studentRegistration.schoolYear.content
      })

      setValue('group', {
        value: props.data.studentRegistration.group,
        label: props.data.studentRegistration.group
      })

      setValue('mutationIn', props.data.studentRegistration.mutationIn)
      setValue('mutationOut', props.data.studentRegistration.mutationOut)
      setValue('mutationOrigin', props.data.studentRegistration.mutationOrigin)
      setValue('mutationTo', props.data.studentRegistration.mutationTo)



      setValue('fatherName', props.data.studentRegistration.fatherName)
      setValue('fatherEducation', EDUCATION[props.data.studentRegistration.fatherEducation])
      setValue('fatherOccupation', OCCUPATION[props.data.studentRegistration.fatherOccupation])
      setValue('fatherOccupationDesc', props.data.studentRegistration.fatherOccupationDesc)
      setValue('fatherAddress', props.data.studentRegistration.fatherAddress)


      setValue('motherName', props.data.studentRegistration.motherName)
      setValue('motherEducation', EDUCATION[props.data.studentRegistration.motherEducation])
      setValue('motherOccupation', OCCUPATION[props.data.studentRegistration.motherOccupation])
      setValue('motherOccupationDesc', props.data.studentRegistration.motherOccupationDesc)
      setValue('motherAddress', props.data.studentRegistration.motherAddress)

      setValue('birthCertificate', props.data.studentRegistration.birthCertificate)
      setValue('familyCard', props.data.studentRegistration.familyCard)
      setValue('proofOfPayment', props.data.studentRegistration.proofOfPayment)



    }

  },[JSON.stringify(props.data)])


  const getAllReligion = async () => {
    const response = await axios.get('http://localhost:8080/annida/religion');
    if (response.status === 200) {
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

  const getAllSchoolYear = async () => {
    const response = await axios.get('http://localhost:8080/annida/school-year');
    if (response.status === 200) {
      const dataSchoolYear = response.data.data.map((schoolYear) => {
        return {
          value: schoolYear.id,
          label: schoolYear.content
        }
      })
      setSchoolYears(dataSchoolYear)
    }
  }

  const registration = async (data) => {
    const response = await axios.put('http://localhost:8080/annida/registration', data)
    console.log('response data', response);

  }
 

  const onSubmit = async (data) => {
    console.log(
      'data', data
    );
    let payload = structuredClone(data);
    let base64birthCertificate = data.birthCertificate?.file;
    let base64familyCard = data.familyCard?.file;

    if(!base64birthCertificate) {
      base64birthCertificate = await getBase64(data.birthCertificate);
    }

    if(!base64familyCard) {
      base64familyCard = await getBase64(data.familyCard);
    }

    let base64proofOfPayment = null;
    if(data?.proofOfPayment) {
      base64proofOfPayment = await getBase64(data.proofOfPayment);
    }
    

    payload = {
        ...props?.data?.studentRegistration,
        bloodType: data.bloodType.value,
        childStatus: data.childStatus.value,
        fatherEducation: data.fatherEducation.value,
        fatherOccupation: data.fatherOccupation.value,
        motherOccupation: data.motherOccupation.value,
        motherEducation: data.motherEducation.value,
        religion: { id: data.religion.value },
        schoolYear: { id: data.schoolYear.value },
        gender: data.gender.value,
        birthCertificate: {
          file: base64birthCertificate,
          name: data.birthCertificate.name,
          type: data.birthCertificate.type
        },
        familyCard: {
          file: base64familyCard,
          name: data.birthCertificate.name,
          type: data.birthCertificate.type
        },
        proofOfPayment: {
          file: base64proofOfPayment,
          name: data.proofOfPayment.name,
          type: data.proofOfPayment.type
        },
        group: data.group.value,
      

    }
    await registration(payload);
    props.onSubmit();
    console.log('onSubmit', data);
  }

  const [currentStep, setCurrentStep] = useState(1)

  const status = (text) => {
    switch (text) {
      case 0:
        return {
          message: 'Waiting Approval Document',
          color: 'lime'
        }
      case 1:
        return {
          message: 'Waiting Approval Payment',
          color: 'lime'
        }
      case 2:
        return {
          message: 'Approved',
          color: 'success'
        }
      case 3:
        return {
          message: 'Reject',
          color: 'error'
        }
      case 4:
        return {
          message: 'Pending',
          color: 'orange'
        }
      case 5:
        return {
          message: 'Failed',
          color: 'error'
        }
      case 6:
        return {
          message: 'Invalid Data',
          color: 'yellow'
        }
      case 7:
        return {
          message: 'Document Data has been updated',
          color: 'blue'
        }
      case 8:
        return {
          message: 'Payment Data has been updated',
          color: 'blue'
        }
    }
  }

  return (
    <Modal
      title='Proses Pendaftaran'
      width={'90%'}
      visible={props?.visible}
      onOk={{}}
      onCancel={props?.onCancel}
      footer={null}
    >
      <Steps current={ props?.data?.approvalDoc ? 2 : props?.data?.approvalPayment ? 2 : 1 }>
        <Step title="Pendaftaran" description="Pendaftaran anak" status='finish' stepNumber={1} />
        <Step title="Verifikasi" description={props?.data?.status === 5 ? 'Pendaftaran Gagal' : "Pemeriksaan Data Pendaftar"} status={props?.data?.status === 5 ? 'error' : ""} stepNumber={2}/>
        <Step title="Pembayaran" description="Pembayaran masuk sekolah" stepNumber={3} />
      </Steps>

      {!props.data?.approvalDoc &&
        <PDBBWrapper>
          <div style={{display: 'flex', flexDirection: 'row', gap: 50, alignItems: 'center', paddingBottom: 20}}>
          <p style={{margin: 0, fontWeight: 'bold'}}>Status</p>
          <Tag color={status(props?.data?.status)?.color}>{status(props?.data?.status)?.message}</Tag>


          </div>
             

          <form onSubmit={handleSubmit(onSubmit)}>
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
                  Status Anak
                </FormLabel>
                <FormInputWrapper>
                  <Controller
                    name="childStatus"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Select placeholder={'Status Anak'}
                      {...field}
                      options={[
                        { value: 1, label: "Anak Kandung" },
                        { value: 2, label: "Anak Angkat" },
                        { value: 3, label: "Anak di Luar Nikah/Kawin" },
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
                        { value: 1, label: "SMA" },
                        { value: 2, label: "S1" },
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
                        { value: 1, label: "Wirausaha" },
                        { value: 2, label: "Dokter" },
                        { value: 3, label: "Polisi" },
                        { value: 4, label: "Guru" },
                        { value: 5, label: "Tentara" },
                        { value: 6, label: "Pengacara" },
                        { value: 7, label: "Ibu Rumah Tangga" },
                        { value: 8, label: "Sekretaris" },
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
                <p onClick={async() => {
                   const birthCertificateFile = getValues('birthCertificate');
                   downloadFile(birthCertificateFile?.name, birthCertificateFile?.type, birthCertificateFile?.file)
                }} style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}}>{birthCertificateName}</p>
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
                  <p onClick={async() => {
                   const familyCard = getValues('familyCard');
                   downloadFile(familyCard?.name, familyCard?.type, familyCard.file)
                }} style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}}>{familyCardName}</p>
                  {errors?.birthCertificate?.type === 'required' && <FormTextError>Kartu Keluarga Wajib diisi</FormTextError>}
                </FormInputWrapper>
              </FormWrapper>
              <h3>{props?.data?.reason}</h3>
            </Card>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button shape='default' htmlType='submit' type='primary' onClick={() => trigger()} style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 30 }} 
              disabled={[4,5].includes(props?.data?.status)}>SUBMIT</Button>

            </div>

          </form>


        </PDBBWrapper>
      }

{!props.data?.approvalPayment && props.data?.approvalDoc &&
        <PDBBWrapper>
          <div style={{display: 'flex', flexDirection: 'row', gap: 50, alignItems: 'center', paddingBottom: 20}}>
          <p style={{margin: 0, fontWeight: 'bold'}}>Status</p>
          <Tag color={status(props?.data?.status).color}>{status(props?.data?.status).message}</Tag>


          </div>
             

          <form onSubmit={handleSubmit(onSubmit)}>
          

            <Card
              title={'Dokumen'}
            >
              <FormWrapper>
                <FormLabel>
                  Bukti Pembayaran
                </FormLabel>
                <FormInputWrapper>
                  <Controller
                    name="proofOfPayment"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => <input type={'file'} placeholder={'Bukti Pembayaran'} onChange={(e) => {
                      onChange(e.target.files[0])
                      // onChange(e)
                    }} />}
                  />
                  {errors?.proofOfPayment?.type === 'required' && <FormTextError>Bukti Pembayaran Wajib diisi</FormTextError>}
                </FormInputWrapper>
              </FormWrapper>

        
              <h3>{props?.data?.reason}</h3>
            </Card>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button shape='default' htmlType='submit' type='primary' onClick={() => trigger()} style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 30 }} 
              disabled={[4,5].includes(props?.data?.status)}>SUBMIT</Button>

            </div>

          </form>


        </PDBBWrapper>
      }

      { props?.data?.status === 2 && 
        <h2>Selamat proses pendaftaran telah selesai 🎉🤞🤞</h2>

      }



    </Modal>
  )
}

export default RegistrationStatus;