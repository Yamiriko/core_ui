/* eslint-disable prettier/prettier */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const Fungsi = require("./Fungsi");
const Token = require("./Token");
const Base64 = require("base-64");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//create database connection
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "coba",
};
var platformOS = process.platform;
var conn = mysql.createConnection(dbConfig);
var hendelKoneksi = function () {
  conn = mysql.createConnection(dbConfig);
  conn.connect(function onConnect(err) {
    if (err) {
      //
      console.log("Sambungan Terputus dengan pesan : " + err);
      setTimeout(() => {
        console.log("Mencoba Menyambungkan Ulang....");
        hendelKoneksi();
        console.log("MySQL/MariaDB Terhubung Kembali.");
      }, 10000);
    } else {
      console.log("MySQL/MariaDB Terhubung dengan id : " + conn.threadId);
    }
    console.log("Berjalan pada Platform : " + platformOS);
  });
};

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Terhubung...");
});

app.post("/api/tampil_biodata", (req, res) => {
  console.log("Tampil Biodata");
  let data = {
    token: req.body.token,
  };
  let sql;
  try {
    sql = Fungsi.CariDataDebug(
      'tb_coba',
      '*',
      'ORDER BY kode ASC'
    );
  } catch (error) {
    sql = Fungsi.CariDataDebug(
      'tb_coba',
      '*',
      'ORDER BY kode ASC'
    );    
    console.log(error);
  }
  res.setHeader("Content-Type", "application/json");
  if (data["token"]) {
    if (Token.LoginWebServis(data["token"])) {
      hendelKoneksi();
      conn.query(sql, data, (err, results) => {
        if (err) {
          res.send(
            JSON.stringify({
              status: 200,
              pesan: "Error.",
              status_tampil: false,
              tokennyaa: "Hidden",
              error: err,
              jumlah_data: 0,
              data: results,
            })
          );
        } else {
          if (results.length > 0) {
            res.send(
              JSON.stringify({
                status: 200,
                pesan: "Datanya ada.",
                status_tampil: true,
                tokennyaa: "Hidden",
                error: null,
                jumlah_data: results.length,
                data: results,
              })
            );
          } else {
            res.send(
              JSON.stringify({
                status: 200,
                pesan: "Belum Ada datanya.",
                status_tampil: false,
                tokennyaa: "Hidden",
                error: null,
                jumlah_data: results.length,
                data: results,
              })
            );
          }
        }
      });
      conn.end();
    } else {
      res.send(
        JSON.stringify({
          status: 200,
          pesan: "Token Tidak Sesuai !",
          status_tampil: false,
          tokennyaa: data["token"],
          error: null,
          jumlah_data: 0,
          data: [],
        })
      );
    }
  } else {
    res.send(
      JSON.stringify({
        status: 200,
        pesan: "Inputan Kurang !",
        status_tampil: false,
        tokennyaa: data["token"],
        error: null,
        jumlah_data: 0,
        data: [],
      })
    );
  }
  console.log(data);
});

app.post("/api/tambah_biodata", (req, res) => {
  console.log("Tambah Biodata");
  let data = {
    token: req.body.token,
    kode: Base64.decode(req.body.kode),
    nama: req.body.nama,
    jenis_kelamin: req.body.jenis_kelamin,
    tgl_lahir: req.body.tgl_lahir,
  };
  try {
    let sql;
    sql = Fungsi.SimpanSingleDebug(
      'tb_coba',
      'kode,nama,jenis_kelamin,tgl_lahir',
      '"'+data.kode+'","'+data.nama+'","'+data.jenis_kelamin+'","'+data.tgl_lahir+'"'
    );
    res.setHeader("Content-Type", "application/json");
    if (data.token && data.kode && data.nama) {
      if (Token.LoginWebServis(data["token"])) {
        hendelKoneksi();
        conn.query(sql, data, (err, results) => {
          if (err) {
            res.send(
              JSON.stringify({
                status: 200,
                status_simpan: false,
                pesan: "Datanya Sudah Ada.",
                tokennyaa: "Hidden",
                error: err,
                jumlah_data: 0,
                data: results,
              })
            );
          } else {
            res.send(
              JSON.stringify({
                status: 200,
                status_simpan: true,
                pesan: "Sukses Input Data.",
                tokennyaa: "Hidden",
                error: null,
                jumlah_data: results.length,
                data: results,
              })
            );
          }
        });
        conn.end();
      } else {
        res.send(
          JSON.stringify({
            status: 200,
            pesan: "Token Tidak Sesuai !",
            status_tambah: false,
            tokennyaa: data["token"],
            error: null,
            jumlah_data: 0,
            data: [],
          })
        );
      }
    } else {
      res.send(
        JSON.stringify({
          status: 200,
          pesan: "Inputan Kurang !",
          status_tambah: false,
          tokennyaa: data["token"],
          error: null,
          jumlah_data: 0,
          data: [],
        })
      );
    }
    console.log(data); 
  } catch (error) {
    console.log("Error System : " + error);
  }
});

app.post("/api/hapus_biodata", (req, res) => {
  console.log("Hapus Biodata");
  let data = {
    token: req.body.token,
    kode: req.body.kode,
  };
  try {
    let sql;
    sql = Fungsi.HapusDebug(
      'tb_coba',
      'kode = "' + Base64.decode(data.kode) + '"'
    );
    res.setHeader("Content-Type", "application/json");
    if (data.token && data.kode) {
      if (Token.LoginWebServis(data.token)) {
        hendelKoneksi();
        conn.query(sql, data, (err, results) => {
          if (err) {
            res.send(
              JSON.stringify({
                status: 200,
                status_hapus: false,
                pesan: "Datanya Sudah Ada.",
                tokennyaa: "Hidden",
                error: err,
                jumlah_data: 0,
                data: results,
              })
            );
          } else {
            res.send(
              JSON.stringify({
                status: 200,
                status_hapus: true,
                pesan: "Sukses Hapus Data.",
                tokennyaa: "Hidden",
                error: null,
                jumlah_data: results.length,
                data: results,
              })
            );
          }
        });
        conn.end();
      } else {
        res.send(
          JSON.stringify({
            status: 200,
            pesan: "Token Tidak Sesuai !",
            status_hapus: false,
            tokennyaa: data["token"],
            error: null,
            jumlah_data: 0,
            data: [],
          })
        );
      }
    } else {
      res.send(
        JSON.stringify({
          status: 200,
          pesan: "Inputan Kurang !",
          status_hapus: false,
          tokennyaa: data["token"],
          error: null,
          jumlah_data: 0,
          data: [],
        })
      );
    }
    console.log(data); 
  } catch (error) {
    console.log("Error System : " + error);
  }
});

//Server listening
var host = process.env.HOT || "localhost";
var port = process.env.PORT || 81;
app.listen(port, () => {
  console.log("Listen di http://" + host + ":" + port);
});