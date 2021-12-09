const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid')
const storage = require('node-persist');

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

  res.send("Noticia adicionada com sucesso ✔");

});

app.get('/noticia', async (req, res) => {
  await storage.init();

  const noticias = await storage.getItem("noticias");
  res.send(noticias);

});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000 ✔`);
})