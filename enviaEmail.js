const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'eileen.schaefer87@ethereal.email',
    pass: 'bW8GaHXetmqm1gvXQg'
  }
})

async function enviaEmail(noticia, email) {
  try {
    await transporter.sendMail({
      from: '"Mayshara Fernandes" <mayshara.fernandes@ethereal.email>',
      to: email,
      subject: noticia.titulo,
      text: noticia.resumo
    })

    return true
  } catch (err) {
    return false
  }
}
module.exports = enviaEmail;