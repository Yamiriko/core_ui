/* eslint-disable prettier/prettier */
function tokenApi() {
  return 'adminwebservis';
}

var login = function(isi_token) {
  let nilai;
  let token_sistem = tokenApi();
  if (!isi_token) {
    nilai = false;
  } else if (!token_sistem) {
    nilai = false;
  } else {
    if (isi_token === token_sistem) {
      nilai = true;
    } else {
      nilai = false;
    }
  }
  console.log("Isi Token : " + isi_token);
  console.log("Token Sistem : " + token_sistem);
  console.log("Nilai : " + nilai);
  return nilai;
}

module.exports = {
  Api: function () {
    return tokenApi();
  },
  LoginWebServis: function(isi_token) {
    return login(isi_token);
  },
};