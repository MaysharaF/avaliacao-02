const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid')
const storage = require('node-persist');
const axios = require('axios').default;
const enviaEmails = require('./enviaEmail')


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/noticia', async (req, res) => {
  const { titulo, resumo, url } = req.body;
  const uuid = uuidv4.v4()

  let noticias = [];

  await storage.init();
  noticias = await storage.getItem("noticias");

  if (!noticias) {
    await storage.setItem('noticias', []);
    noticias = await storage.getItem("noticias");
  }

  noticias.push({
    id: uuid,
    titulo,
    resumo,
    url
  });

  await storage.updateItem('noticias', noticias);

  res.send(noticias);

});

app.get('/noticia', async (req, res) => {
  await storage.init();

  const noticias = await storage.getItem("noticias");
  res.send(noticias);

});

app.get('/noticia/:id', async (req, res) => {
  const { id } = req.params;

  await storage.init();

  const noticias = await storage.getItem("noticias");

  if (noticias.length === 0) {
    res.send({ error: "Oops! Nenhuma noticia encontrada." });
  } else {
    const noticia = noticias.find(noticia => noticia.id === id);
    res.send(noticia);
  }

});

app.post('/inscricao', async (req, res) => {
  const { email } = req.body;

  let emails = [];

  await storage.init();
  emails = await storage.getItem("emails");

  if (!emails) {
    await storage.setItem('emails', []);
    emails = await storage.getItem("emails");
  }
  emails = await storage.getItem("emails");
  emails.push(email);

  await storage.updateItem('emails', emails);
  res.send(emails);

});

app.put('/enviar/:id', async (req, res) => {
  const { id } = req.params

  await storage.init();
  const emails = await storage.getItem("emails");

  axios.get(`http://localhost:3000/noticia/${id}`).then(resp => {
    const noticia = resp.data;
    let count = 0;

    var intervalo = setInterval(() => {
      enviaEmails(noticia, emails[count]);
      console.log(enviaEmails(noticia, emails[count]))

      console.log("📩 Enviando email para: " + emails[count] + "...");
      count++;
      if (count === emails.length) {
        clearInterval(intervalo);
        console.log("\nEmail enviado com sucesso!✅\n");
        res.send(emails);
      }
    }, 2000)

  }).catch(err => {
    res.send("Oops! Ocorreu algum problema.");
  })

})


app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000 ✅`);
})