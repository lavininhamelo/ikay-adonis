'use strict'

const User = use('App/Models/User');

class UserController {

  async store({request, response}){
    try{
      const data = request.only(['id','email','password']);
      const user = await User.create(data)
      return user;
    }
    catch(err){
      return response
      .status(err.status)
      .send({error: {message: 'Algo não ocorreu bem!'}})
    }
  };

}

module.exports = UserController
