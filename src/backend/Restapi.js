/* eslint-disable prettier/prettier */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const Fungsi = require("./Fungsi");
const Token = require("./Token");

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

//Server listening
var host = process.env.HOT || "localhost";
var port = process.env.PORT || 81;
app.listen(port, () => {
  console.log("Listen di http://" + host + ":" + port);
});