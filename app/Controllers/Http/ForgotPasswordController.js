'use strict'

const crypto = require('crypto');
const User = use('App/Models/User');
const Mail = use('Mail');
class ForgotPasswordController {
  async store({request, response}){
    try{
      const email = request.input('email');
      const user = await User.findByOrFail('email', email);
      user.token = crypto.randomBytes(10).toString('hex');
      user.token_created_at = new Date();
      console.log('Salvar');
      await user.save();
      console.log('Enviar');
   // Envia e-mail para reset de senha
   await Mail.send(
    ['emails.recover'],
    {
      email,
      token: user.token,
      link: `${request.input('request_url')}?token${user.token}`
    },
    message => {
      message
        .to(user.email)
        .from('laviniascmelo@gmail.com', 'Lavínia Melo')
        .subject('Recuperação de senha')
    }
  )
} catch (err) {
  return response.status(err.status).send({
    error: {
      message: 'Algo deu errado. Verifique o e-mail e tente novamente'
    }
  })
}}
}

module.exports = ForgotPasswordController
