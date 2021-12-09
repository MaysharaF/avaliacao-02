const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'maverick.oreilly4@ethereal.email',
    pass: 'tfq8gjCnYWTPjSn9z9'
  }
});

async function enviaEmail(noticia, email) {
  try {
    await transporter.sendMail({
      from: '"Maverick OReilly" <maverick.oreilly4@ethereal.email>',
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