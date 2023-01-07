/* eslint-disable prettier/prettier */
const momentjs = require('moment-timezone')

// eslint-disable-next-line no-restricted-globals
// var serverGlobal = 'http://' + location.hostname + ':81'
var serverGlobal = 'http://localhost:81'
var kontentipe = 'application/x-www-form-urlencoded; charset=UTF-8'
var apiBioData = serverGlobal + '/api/tampil_biodata'

var cari_data = function (nama_tabel, nama_field, kondisi) {
  let sql
  if (nama_tabel && kondisi && kondisi) {
    sql = 'SELECT ' + nama_field + ' '
    sql += 'FROM ' + nama_tabel + ' ' + kondisi
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('kondisi : ' + kondisi)
  }
  return sql
}

var cari_data_debug = function (nama_tabel, nama_field, kondisi) {
  let sql
  if (nama_tabel && kondisi && kondisi) {
    sql = 'SELECT ' + nama_field + ' '
    sql += 'FROM ' + nama_tabel + ' ' + kondisi
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('kondisi : ' + kondisi)
  }
  return sql
}

var simpan_data = function (nama_tabel, nama_field, value_field) {
  let sql
  if (nama_tabel && nama_field && value_field) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ') '
    sql += 'VALUES(' + value_field + ')'
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('value_field : ' + value_field)
  }
  return sql
}

var simpan_data_debug = function (nama_tabel, nama_field, value_field) {
  let sql
  if (nama_tabel && nama_field && value_field) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ') '
    sql += 'VALUES(' + value_field + ')'
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('value_field : ' + value_field)
  }
  return sql
}

var simpan_data_ignore = function (nama_tabel, nama_field, value_field) {
  let sql
  if (nama_tabel.length > 0 && nama_field.length > 0 && value_field.length > 0) {
    sql = 'INSERT IGNORE INTO ' + nama_tabel + '(' + nama_field + ') '
    sql += 'VALUES(' + value_field + ')'
    // console.log("Kueri Lengkap: \n" + sql);
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('value_field : ' + value_field)
  }
  return sql
}

var simpan_multi = function (nama_tabel, nama_field, value_field) {
  let sql
  if (nama_tabel && nama_field && value_field) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ') '
    sql += 'VALUES ' + value_field + ''
    // console.log("Kueri Lengkap: \n" + sql);
  } else {
    sql = ''
    // console.log("Parameter Kueri Belum Lengkap !");
    // console.log("nama_tabel : " + nama_tabel);
    // console.log("nama_field : " + nama_field);
    // console.log("value_field : " + value_field);
  }
  return sql
}

var simpan_multi_debug = function (nama_tabel, nama_field, value_field) {
  let sql
  if (nama_tabel && nama_field && value_field) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ') VALUES ' + value_field + ''
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('value_field : ' + value_field)
  }
  return sql
}

var simpan_multi_duplicate = function (nama_tabel, nama_field, value_field, duplicatenya) {
  let sql
  if (nama_tabel && nama_field && value_field) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ') '
    sql += 'VALUES ' + value_field + ' '
    sql += 'ON DUPLICATE KEY UPDATE ' + duplicatenya
  } else {
    sql = ''
  }
  return sql
}

var simpan_multi_duplicate_debug = function (nama_tabel, nama_field, value_field, duplicatenya) {
  let sql
  if (nama_tabel && nama_field && value_field) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ') '
    sql += 'VALUES ' + value_field + ' '
    sql += 'ON DUPLICATE KEY UPDATE ' + duplicatenya
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('value_field : ' + value_field)
  }
  return sql
}

//nama_tabel,nama_field,value_field,gbrBase64
var simpan_data_base64 = function (nama_tabel, nama_field, field_base64, value_field, gbrBase64) {
  let sql

  // let base64Data = req.rawBody.replace(/^data:image\/png;base64,/, "");

  if (nama_tabel && nama_field && value_field && field_base64 && gbrBase64) {
    sql = 'INSERT INTO ' + nama_tabel + '(' + nama_field + ',' + field_base64 + ') '
    sql += 'VALUES(' + value_field + ',' + gbrBase64 + ')'
    // console.log("Kueri Lengkap: \n" + sql);
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('nama_field : ' + nama_field)
    console.log('field_base64 : ' + field_base64)
    console.log('value_field : ' + value_field)
    console.log('field_base64 : ' + field_base64)
  }
  return sql
}

var ubah_data = function (nama_tabel, nama_field, kondisi) {
  let sql
  if (nama_tabel && nama_field && kondisi) {
    sql = 'UPDATE ' + nama_tabel + ' SET ' + nama_field + ' '
    sql += 'WHERE ' + kondisi + ''
  } else {
    sql = ''
  }
  return sql
}

var ubah_data_debug = function (nama_tabel, nama_field, kondisi) {
  let sql
  if (nama_tabel && nama_field && kondisi) {
    sql = 'UPDATE ' + nama_tabel + ' SET ' + nama_field + ' WHERE ' + kondisi + ''
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('kondisi : ' + kondisi)
  }
  return sql
}

var hapus_data = function (nama_tabel, kondisi) {
  let sql
  if (nama_tabel && kondisi) {
    sql = 'DELETE FROM ' + nama_tabel + ' '
    sql += 'WHERE ' + kondisi + ''
  } else {
    sql = ''
  }
  return sql
}

var hapus_data_debug = function (nama_tabel, kondisi) {
  let sql
  if (nama_tabel && kondisi) {
    sql = 'DELETE FROM ' + nama_tabel + ' '
    sql += 'WHERE ' + kondisi + ''
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
    console.log('kondisi : ' + kondisi)
  }
  return sql
}

var kosongkan_data_debug = function (nama_tabel) {
  let sql
  if (nama_tabel) {
    sql = 'TRUNCATE TABLE `' + nama_tabel + '`'
    console.log('Kueri Lengkap: \n' + sql)
  } else {
    sql = ''
    console.log('Parameter Kueri Belum Lengkap !')
    console.log('nama_tabel : ' + nama_tabel)
  }
  return sql
}

var kosongkan_data = function (nama_tabel) {
  let sql
  if (nama_tabel) {
    sql = 'TRUNCATE TABLE `' + nama_tabel + '`'
  } else {
    sql = ''
  }
  return sql
}

var urlToFile = function (url, filename, mimeType) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer()
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType })
    })

  /*
  Usage example:
  urltoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt','text/plain')
  .then(function(file){ console.log(file);});
  */
}

var dataURLtoFile = function (dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })

  /*
  var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=','hello.txt');
  console.log(file);
  */
}

var waktu_sekarang = function (formatnya) {
  //DDMMYYYYHH
  let tampil_sekarang = momentjs().locale('ID').tz('Asia/Jakarta').format(formatnya)
  return tampil_sekarang
}

const buka_link = (linknya) => {
  window.location = linknya
}

module.exports = {
  kontentipe: kontentipe,
  apiBioData: apiBioData,
  CariData: function (nama_tabel, nama_field, kondisi) {
    return cari_data(nama_tabel, nama_field, kondisi)
  },
  CariDataDebug: function (nama_tabel, nama_field, kondisi) {
    return cari_data_debug(nama_tabel, nama_field, kondisi)
  },
  SimpanSingle: function (nama_tabel, nama_field, value_field) {
    return simpan_data(nama_tabel, nama_field, value_field)
  },
  SimpanSingleDebug: function (nama_tabel, nama_field, value_field) {
    return simpan_data_debug(nama_tabel, nama_field, value_field)
  },
  SimpanSingleIgnore: function (nama_tabel, nama_field, value_field) {
    return simpan_data_ignore(nama_tabel, nama_field, value_field)
  },
  SimpanMulti: function (nama_tabel, nama_field, value_field) {
    return simpan_multi(nama_tabel, nama_field, value_field)
  },
  SimpanMultiDebug: function (nama_tabel, nama_field, value_field) {
    return simpan_multi_debug(nama_tabel, nama_field, value_field)
  },
  SimpanMultiDuplicate: function (nama_tabel, nama_field, value_field, duplicatenya) {
    return simpan_multi_duplicate(nama_tabel, nama_field, value_field, duplicatenya)
  },
  SimpanMultiDuplicateDebug: function (nama_tabel, nama_field, value_field, duplicatenya) {
    return simpan_multi_duplicate_debug(nama_tabel, nama_field, value_field, duplicatenya)
  },
  SimpanBase64: function (nama_tabel, nama_field, field_base64, value_field, gbrBase64) {
    return simpan_data_base64(nama_tabel, nama_field, field_base64, value_field, gbrBase64)
  },
  Ubah: function (nama_tabel, nama_field, kondisi) {
    return ubah_data(nama_tabel, nama_field, kondisi)
  },
  UbahDebug: function (nama_tabel, nama_field, kondisi) {
    return ubah_data_debug(nama_tabel, nama_field, kondisi)
  },
  Hapus: function (nama_tabel, kondisi) {
    return hapus_data(nama_tabel, kondisi)
  },
  HapusDebug: function (nama_tabel, kondisi) {
    return hapus_data_debug(nama_tabel, kondisi)
  },
  KosongkanData: function (nama_tabel) {
    return kosongkan_data(nama_tabel)
  },
  KosongkanDataDebug: function (nama_tabel) {
    return kosongkan_data_debug(nama_tabel)
  },
  UrlToFile: function (url, filename, mimeType) {
    return urlToFile(url, filename, mimeType)
  },
  DataUrlToFile: function (dataurl, filename) {
    return dataURLtoFile(dataurl, filename)
  },
  WaktuSekarang: function (formatnya) {
    return waktu_sekarang(formatnya)
  },
  GetIpLocal: function () {
    // eslint-disable-next-line no-restricted-globals
    return location.hostname
  },
  BukaLink : function(alamatnya) {
    return buka_link(alamatnya)
  }
}
