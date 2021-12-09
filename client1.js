const axios = require('axios').default;
const noticias = require('./dados/noticias.json')
const emails = require('./dados/emails.json')

function addNoticias() {
  Promise.all(noticias.map(async noticia => {
    axios.post('http://localhost:3000/noticia', noticia)
      .then((res) => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }))
}
addNoticias();

function addEmails() {
  Promise.all(emails.map(async email => {
    axios.post('http://localhost:3000/inscricao', email)
      .then((res) => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }))
}
addEmails();