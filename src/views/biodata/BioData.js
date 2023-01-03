/* eslint-disable prettier/prettier */
import { CCard, CCardBody, CCardHeader, CCardTitle, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Fungsi from 'src/backend/Fungsi'
import swal from 'sweetalert'
import toastr from 'toastr'
import momentjs from 'moment-timezone';
import Token from 'src/backend/Token'

const BioData = () => {
  const [list, setList] = useState([]);

  function loading_swal(){
    let span = document.createElement("span");
    span.innerHTML = '<h3><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i> Mohon Ditunggu...<h3><br><br>';
    swal({
      content: span,
      html: true,
      icon: "info",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: false,
    });
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
        if (data_json.jumlah_data > 0){
          setList(data_json.data);
        }
      })
      .catch((error) => {
        swal.close()
        toastr.error('Error Parsing : ' + error, 'Error')
      })
  }

  useEffect(() => {
    tampilData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <CRow>
        <CCol md={12}>
          <CCard>
            <CCardHeader>
              <CCardTitle>
                Bio Data
              </CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={12}>
                  <div className='table-responsive'>
                    <CTable striped hover bordered responsive="lg">
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell className="text-center">Kode</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Nama</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Jenis Kelamin</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Tanggal Lahir</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {
                          list.length > 0 ? 
                          list.map((item,idx) => {
                            let tgl_lahir = momentjs(item.tgl_lahir).tz('Asia/Jakarta').locale('id').format("DD MMMM YYYY")
                            return(
                              <CTableRow key={idx}>
                                <CTableDataCell>{item.kode}</CTableDataCell>
                                <CTableDataCell>{item.nama}</CTableDataCell>
                                <CTableDataCell>{item.jenis_kelamin}</CTableDataCell>
                                <CTableDataCell>{tgl_lahir}</CTableDataCell>
                              </CTableRow>
                            )
                          })
                          :
                          <CTableRow key={1}>
                            <CTableHeaderCell className="text-center" colSpan={4}><i className="text-info">Belum Ada Datanya.</i></CTableHeaderCell>
                          </CTableRow>
                        }
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
