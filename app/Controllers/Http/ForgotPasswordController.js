"use strict";
const moment = require("moment")
const crypto = require("crypto");
const User = use("App/Models/User");
const Mail = use("Mail");
class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input("email");

      //Procurar email do usuario
      const user = await User.findByOrFail("email", email);
      user.token = crypto.randomBytes(10).toString("hex");
      user.token_created_at = new Date();
      await user.save();

      // Envia e-mail para reset de senha
      await Mail.send(
        ["emails.recover"],
        {
          email,
          token: user.token,
          link: `${request.input("request_url")}?token${user.token}`,
        },
        message => {
          message
            .to(user.email)
            .from("laviniascmelo@gmail.com", "Lavínia Melo")
            .subject("Recuperação de senha");
        },
      );

      return response.send(
        { message: "Um link de recuperação foi enviado para o seu e-mail.",
          email: user.email,
          token: user.token
      }
       )

    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: "Algo deu errado. Verifique o e-mail e tente novamente",
        },
      });
    }
  }

  async update({ request, response }) {
    try {
      const {token, password} = request.all();
      const user = await User.findByOrFail("token", token);
      const tokenExpired = moment()
      .subtract('2','days')
      .isAfter(user.token_created_at)
      if(tokenExpired){
        return response.status(401).send({
          error: {
            message: "O token de recuperação está expirado!"
          },
        });

      }
      user.token = null;
      user.token_created_at = null;
      user.password = password;
      user.save();
      return response.send(
        { message: "Senha alterada com sucesso;",
          token: user.token
      })

    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: "Pedido de recuperação expirado!",
        },
      });
    }
  }
}

module.exports = ForgotPasswordController;
