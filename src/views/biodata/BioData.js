/* eslint-disable prettier/prettier */
import { CCard, CCardBody, CCardHeader, CCardTitle, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Fungsi from 'src/backend/Fungsi'
import swal from 'sweetalert'
import toastr from 'toastr'
import momentjs from 'moment-timezone';
import Token from 'src/backend/Token'
import id from 'date-fns/locale/id';

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
                <h4>Bio Data</h4>
              </CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={12}>
                  <div className='table-responsive'>
                    <table className='table table-bordered table-hover table-striped'>
                      <thead>
                        <tr>
                          <th className="text-center">Kode</th>
                          <th className="text-center">Nama</th>
                          <th className="text-center">Jenis Kelamin</th>
                          <th className="text-center">Tanggal Lahir</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          list.length > 0 ? 
                          list.map((item,idx) => {
                            let tgl_lahir = momentjs(item.tgl_lahir).tz('Asia/Jakarta').locale(id).format("DD MMMM YYYY")
                            return(
                              <tr key={idx}>
                                <td className="text-center">{item.kode}</td>
                                <td className="text-center">{item.nama}</td>
                                <td className="text-center">{item.jenis_kelamin}</td>
                                <td className="text-center">{tgl_lahir}</td>
                              </tr>
                            )
                          })
                          :
                          <tr>
                            <td className="text-center" colSpan={4}><i className="text-info">Belum Ada Datanya.</i></td>
                          </tr>
                        }
                      </tbody>
                    </table>
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
