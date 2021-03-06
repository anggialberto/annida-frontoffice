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
import { Button, message, Modal } from 'antd';
import axios from 'axios';
import { getBase64 } from 'src/utils/file';
import SuccessModal from '~components/SuccessModal';
// import Modal from 'antd/lib/modal/Modal';


const PPDBPage = () => {
  const [religions, setReligions] = useState([]);
  const [registrationStudent, setRegistrationStudent] = useState();
  const [errorRegistrationStudent, setErrorRegistrationStudent] = useState();
  const [schoolYears, setSchoolYears] = useState([]);
  const [modalRegistrationCheck, setModalRegistrationCheck] = useState(false);
  const [modalPPDB, setModalPPDB] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [successRegister, setSuccessRegister] = useState({
    visible: false,
    message: null
  })

  const { control, trigger, getValues, handleSubmit, reset, formState: { errors } } = useForm({
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
      phoneNumber: '',

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
  }, [])

  const registration = async (data) => {
    const response = await axios.post('http://localhost:8080/annida/registration', data)
    return response;
    console.log('response data', response);

  }

  const getRegistrationInfoById = async (id) => {
    const response = await axios.get(`http://localhost:8080/annida/monitoring/registration/${id}`);
    return response;
  }

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



  const onSubmit = async (data) => {
    let payload = structuredClone(data);
    const base64birthCertificate = await getBase64(data.birthCertificate);
    const base64familyCard = await getBase64(data.familyCard);

    payload = {
      ...payload,
      bloodType: data.bloodType.value,
      childStatus: data.childStatus.value,
      fatherEducation: data.fatherEducation.value,
      motherEducation: data.motherEducation.value,
      fatherOccupation: data.fatherOccupation.value,
      motherOccupation: data.motherOccupation.value,
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
      group: data.group.value,

    }

    try {
      const result = await registration(payload);
      console.log('result', result?.data);
      if(result?.data?.code >= 400) {
        message.error('Gagal mendaftar, perhatikan kembali data yang anda buat.')
      } else {
        if(result.data?.data?.ticketNumber) {
          setSuccessRegister({
            visible: true,
            message: (
              <>
                <p>Ticket Number : {result.data?.data?.ticketNumber}</p>
                <button onClick={() => {navigator.clipboard.writeText(result.data?.data?.ticketNumber)}}>
                  Copy Ticket Number to clipboard
                </button>
              </>
            )
          })
        }
        reset();
        message.success('Berhasil melakukan registrasi anak anda di TK Annida ????')
      }
      
    } catch(e) {

    }
    
    
    console.log('onSubmit', data);
  }

  return (
    <>
      <PDBBWrapper>
        <Card
          title={'Selamat Datang di PPDB TK Annida'}
          description={'Apabila anda telah melakukan pendaftaran, silahkan klik tombol "Cek Status Pendaftaran"'}
        >
          <button style={{ width: 'max-content' }} className={'btn btn--purple'} onClick={() => {
            setModalRegistrationCheck(true);
          }}>Cek Status Pendaftaran</button>
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
                {errors?.childStatus?.type === 'required' && <FormTextError>Status anak Wajib diisi</FormTextError>}
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
                Nomor Telepon
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder={'Nomor Telepon'} error={!!errors.phoneNumber} {...field} />}
                />
                {errors?.phoneNumber?.type === 'required' && <FormTextError>Nomor Telepon Wajib diisi</FormTextError>}
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
                      { value: "1", label: "SMP" },
                      { value: "2", label: "SMA" },
                      { value: "3", label: "S1" },
                      { value: "4", label: "S2" },
                      { value: "5", label: "S3" },
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
                      { value: "9", label: "Lainnya" },
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
                  render={({ field }) => <TextArea placeholder={'Deskripsi Pekerjaan Ayah'} error={!!errors.fatherOccupationDesc} {...field} />}
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
                      { value: "1", label: "SMP" },
                      { value: "2", label: "SMA" },
                      { value: "3", label: "S1" },
                      { value: "4", label: "S2" },
                      { value: "5", label: "S3" },
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
                      { value: "9", label: "Lainnya" },
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

          <Card
            title={'Data Mutasi'}
          >
            <small>Tidak perlu diisi jika bukan siswa/i mutasi atau pindahan</small>
            <FormWrapper>
              <FormLabel>
                Tanggal Masuk Mutasi
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="mutationIn"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => <Input type={'date'} placeholder={'Tanggal Masuk Mutasi'} />}
                />
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Tanggal Keluar Mutasi
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="mutationOut"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => <Input type={'date'} placeholder={'Tanggal Keluar Mutasi'} />}
                />
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Pindahan Mutasi Asal
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="mutationOrigin"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => <Input placeholder={'Pindahan Mutasi Asal'} />}
                />
              </FormInputWrapper>
            </FormWrapper>

            <FormWrapper>
              <FormLabel>
                Pindahan Mutasi Tujuan
              </FormLabel>
              <FormInputWrapper>
                <Controller
                  name="mutationTo"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => <Input placeholder={'Pindahan Mutasi Tujuan'} />}
                />
              </FormInputWrapper>
            </FormWrapper>

          </Card>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button shape='default' htmlType='submit' type='primary' onClick={() => trigger()} style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 30 }}>SUBMIT</Button>

          </div>

        </form>


      </PDBBWrapper>
      <Modal
        visible={modalRegistrationCheck}
        title="Cek Status Pendaftaran"
        onOk={null}
        onCancel={null}
        footer={null}
      >
        <label>No Pendaftaran</label>
        <Input value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} style={{ width: '100%' }} />
        {errorRegistrationStudent && <p>{errorRegistrationStudent}</p>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 20, paddingTop: 20 }}>
          <Button type="primary" onClick={async () => {
            const response = await getRegistrationInfoById(registrationNumber);
            console.log('response', response);
            if (response.data?.data) {
              setRegistrationStudent(response.data.data);
              setModalPPDB(true);
              setModalRegistrationCheck(false);
              setErrorRegistrationStudent('');
            } else {
              setErrorRegistrationStudent('Tidak ditemukan')
            }
          }}>Submit</Button>
          <Button type="ghost" onClick={() => {
            // is it good comment 3 lines below?
            // setErrorRegistrationStudent('');
            // setRegistrationNumber('');
            // setRegistrationStudent({})
            setModalRegistrationCheck(false);
          }}>Cancel</Button>
        </div>

      </Modal>
      <RegistrationStatus onCancel={() => {
        setModalPPDB(false);
        setRegistrationNumber('')
      }} onSubmit={() => {
        setModalPPDB(false);
        setRegistrationNumber('')
        message.info('Berhasil Memperbaharui data ????')
      }} visible={modalPPDB} data={registrationStudent} />

      <SuccessModal visible={successRegister.visible} message={successRegister?.message} onClose={() => {
        setSuccessRegister({
          visible: false,
          message:null
        })
      }} />

    </>
  )
}

export default PPDBPage;