/* eslint-disable prettier/prettier */
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Fungsi from 'src/backend/Fungsi'
import swal from 'sweetalert'
import AWN from 'awesome-notifications'
import 'awesome-notifications/src/styles/style.scss'
import momentjs from 'moment-timezone'
import Token from 'src/backend/Token'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Base64 from 'base-64'

const BioData = () => {
  const queryPage = useLocation().search.match(/halaman=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const history = useNavigate()
  const tambah_data_klik = useCallback(() => history('/biodata/tambah'), [history])
  const notifier = new AWN({
    maxNotifications: 6,
  })
  const [list, setList] = useState([])

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

  function tampilData() {
    let rhs = Token.Api()
    let fd = 'token=' + rhs
    const optionku = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': Fungsi.kontentipe,
      },
      body: fd,
    }

    fetch(Fungsi.apiBioData, optionku)
      .then((response) => response.json(), loading_swal())
      .then((data_json) => {
        swal.close()
        if (data_json.jumlah_data > 0) {
          setList(data_json.data)
        }
      })
      .catch((error) => {
        swal.close()
        notifier.alert('Pesan Error System : ' + error)
      })
  }

  function ubahData(kodenya) {
    const linkUbah = '/biodata/ubah/?kode=' + Base64.encode(kodenya)
    history(linkUbah)
  }

  function hapusData(kode) {
    if (!kode) {
      notifier.warning('Pesan System : Kode Untuk Hapusnya Kosong !')
    } else {
      swal({
        title: 'Yakin Hapus Data ini ?',
        text: '',
        icon: 'info',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
          batal: {
            text: 'Tidak Jadi',
            value: 'batal',
            className: 'btn btn-secondary',
          },
          acc: {
            text: 'Ya',
            value: 'ya',
            className: 'btn btn-danger',
          },
        },
      }).then((value) => {
        if (value === 'ya') {
          let rhs = Token.Api()
          let fd = 'token=' + rhs
          fd += '&kode=' + Base64.encode(kode)
          const optionku = {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': Fungsi.kontentipe,
            },
            body: fd,
          }

          fetch(Fungsi.hapusBiodata, optionku)
            .then((response) => response.json(), loading_swal())
            .then((data_json) => {
              swal.close()
              if (data_json.status_hapus) {
                notifier.info('Pesan System : ' + data_json.pesan)
                tampilData()
              } else {
                notifier.warning('Pesan System : ' + data_json.pesan)
              }
            })
            .catch((error) => {
              swal.close()
              notifier.alert('Pesan Error System : ' + error)
            })
        }
      })
    }
  }

  useEffect(() => {
    tampilData()
    currentPage !== page && setPage(currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, page])

  return (
    <>
      <CRow>
        <CCol md={12}>
          <CCard>
            <CCardHeader>
              <CCardTitle>
                <CRow>
                  <CCol className="text-start" md={8}>
                    Bio Data
                  </CCol>
                  <CCol className="text-end" md={4}>
                    <CButton
                      type="button"
                      color="primary"
                      title="Tambahkan Data Baru?"
                      onClick={tambah_data_klik}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Tambah Data
                    </CButton>
                  </CCol>
                </CRow>
              </CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={12}>
                  <div className="table-responsive">
                    <CTable striped hover bordered responsive="lg">
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell
                            className="text-start"
                            style={{ minWidth: '80px', width: '80px' }}
                          >
                            #
                          </CTableHeaderCell>
                          <CTableHeaderCell
                            className="text-center"
                            style={{ minWidth: '100px', width: '100px' }}
                          >
                            Aksi
                          </CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Kode</CTableHeaderCell>
                          <CTableHeaderCell className="text-center" style={{ minWidth: '150px' }}>
                            Nama
                          </CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Jenis Kelamin</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Tanggal Lahir</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {list.length > 0 ? (
                          list.map((item, idx) => {
                            let tgl_lahir = momentjs(item.tgl_lahir)
                              .tz('Asia/Jakarta')
                              .locale('id')
                              .format('DD MMMM YYYY')
                            return (
                              <CTableRow key={idx}>
                                <CTableDataCell>{idx + 1}</CTableDataCell>
                                <CTableDataCell className="text-center">
                                  <CButtonGroup role="group">
                                    <CButton
                                      type="button"
                                      color="warning"
                                      title="Ubah Data Ini ?"
                                      size="sm"
                                      onClick={() => ubahData(item.kode)}
                                    >
                                      <FontAwesomeIcon icon={faPencil} />
                                    </CButton>
                                    <CButton
                                      type="button"
                                      color="danger"
                                      title="Hapus Data Ini ?"
                                      size="sm"
                                      onClick={() => hapusData(item.kode)}
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </CButton>
                                  </CButtonGroup>
                                </CTableDataCell>
                                <CTableDataCell>{item.kode}</CTableDataCell>
                                <CTableDataCell>{item.nama}</CTableDataCell>
                                <CTableDataCell>{item.jenis_kelamin}</CTableDataCell>
                                <CTableDataCell>{tgl_lahir}</CTableDataCell>
                              </CTableRow>
                            )
                          })
                        ) : (
                          <CTableRow key={1}>
                            <CTableHeaderCell className="text-center" colSpan={6}>
                              <i className="text-info">Belum Ada Datanya.</i>
                            </CTableHeaderCell>
                          </CTableRow>
                        )}
                      </CTableBody>
                    </CTable>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default BioData
