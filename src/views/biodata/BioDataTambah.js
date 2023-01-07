/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AWN from 'awesome-notifications'
import 'awesome-notifications/src/styles/style.scss'
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCardTitle, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import { faNodeJs } from '@fortawesome/free-brands-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Token from 'src/backend/Token'
import Fungsi from 'src/backend/Fungsi'
import swal from 'sweetalert'
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'
import Base64 from 'base-64'
import $ from 'jquery'

const BioDataTambah  = () => {
  const history = useNavigate()
  const Kembali = useCallback(() => history('/biodata'), [history])
  const { register, handleSubmit } = useForm()
  const [visible, setVisible] = useState(true)
  const notifier = new AWN({
    maxNotifications: 6,
  })
  let flatpickr = {
    enableTime: false,
    disableMobile: true,
    dateFormat: 'Y-m-d',
  }

  function loading_swal() {
    let span = document.createElement('span')
    span.innerHTML =
      '<h3><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i> Mohon Ditunggu...<h3><br><br>'
    swal({
      content: span,
      html: true,
      icon: 'info',
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: false,
    })
  }

  function resetForm() {
    $('#form_input').trigger('reset')
    $('#kode').focus()
  }

  function onSubmit(data) {
    let kode = data.kode
    let nama = data.nama
    let jenis_kelamin = data.jenis_kelamin
    let tgl_lahir = $('tgl_lahir').val()

    let rhs = Token.Api()
    let fd = 'token=' + rhs
    fd += '&kode=' + Base64.encode(kode)
    fd += '&nama=' + nama
    fd += '&jenis_kelamin=' + jenis_kelamin
    fd += '&tgl_lahir=' + tgl_lahir

    const optionku = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': Fungsi.kontentipe,
      },
      body: fd,
    }

    fetch(Fungsi.tambahBiodata, optionku)
      .then((response) => response.json(), loading_swal())
      .then((data_json) => {
        swal.close()
        if (data_json.status_simpan) {
          notifier.info('Pesan System : ' + data_json.pesan)
          resetForm()
        }
        else{
          notifier.warning('Pesan System : ' + data_json.pesan)
        }
      })
      .catch((error) => {
        swal.close()
        notifier.alert('Pesan Error System : ' + error)
      })
  }

  return(
    <CRow>
      <CCol md={12}>
        <CCard>
          <CCardHeader>
            <CCardTitle>
              <CRow>
                Tambah Biodata
              </CRow>
            </CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={12}>
                <CRow>
                  <CCol md={12}>
                    <CAlert
                      color="info"
                      dismissible
                      visible={visible}
                      onClose={() => setVisible(false)}
                    >
                      <i className="text-muted">Form Biodata</i>
                    </CAlert>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={12}>
                    <CForm id="form_input" onSubmit={handleSubmit(onSubmit)}>
                      <CRow>
                        <CCol md={12}>
                          <div className="form-group mb-3">
                            <CFormLabel>Kode</CFormLabel>
                            <CFormInput 
                              type="text"
                              placeholder="Kode"
                              name="kode"
                              id="kode"
                              autoComplete="off"
                              autoFocus
                              maxLength={50}
                              {...register('kode', { required: true, maxLength: 25 })}
                            /> 
                          </div>
                          <div className="form-group mb-3">
                            <CFormLabel>Nama</CFormLabel>
                            <CFormInput 
                              type="text"
                              placeholder="Nama"
                              name="nama"
                              id="nama"
                              autoComplete="off"
                              maxLength={50}
                              {...register('nama', { required: true, maxLength: 50 })}
                            /> 
                          </div>
                          <div className="form-group mb-3">
                            <CFormLabel>Jenis Kelamin</CFormLabel>
                            <CFormSelect id="jenis_kelamin" 
                              aria-label="Default select example"
                              options={[
                                '-Pilih-',
                                { label: 'Laki-Laki', value: 'Laki-Laki' },
                                { label: 'Perempuan', value: 'Perempuan' },
                              ]}
                              {...register('jenis_kelamin')}
                            />
                          </div>
                          <div className="form-group mb-3">
                            <CFormLabel>Tanggal Lahir</CFormLabel>
                            <Flatpickr
                              id="tgl_lahir"
                              className="form-control"
                              options={flatpickr}
                              placeholder="Klik Untuk Buka Kalender"
                            />
                          </div>
                        </CCol>
                      </CRow>
                      <CRow>
                          <CCol md={8} className="text-left">
                            <CButton type="submit" title="Simpan Data" color="success">
                              <FontAwesomeIcon icon={faNodeJs} /> Simpan
                            </CButton>
                          </CCol>
                          <CCol md={4} className="text-end">
                            <CButton
                              type="button"
                              title="Kembali Ke Biodata"
                              color="secondary"
                              onClick={Kembali}
                            >
                              <FontAwesomeIcon icon={faAngleLeft} /> Kembali
                            </CButton>
                          </CCol>
                        </CRow>
                    </CForm>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BioDataTambah