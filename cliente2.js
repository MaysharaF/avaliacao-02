const axios = require('axios').default;

axios.get('http://localhost:3000/noticia').then(res => {
  const noticias = res.data;

  if (noticias.length !== 0) {
    noticias.forEach(noticia => {
      console.log("id: " + noticia.id);
      console.log("titulo: " + noticia.titulo);
      console.log("resumo: " + noticia.resumo);
      console.log("URL: " + noticia.url);
      console.log("\n");

    })
    const noticia = noticias[0];

    axios.put(`http://localhost:3000/enviar/${noticia.id}`).then(res => {
      console.log(`Noticia ${noticia.id} enviada com sucesso.`);
    })
  } else {
    console.log("Nenhuma noticia encontrada!")
  }
});