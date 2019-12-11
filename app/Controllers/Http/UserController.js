"use strict";

const User = use("App/Models/User");
const Order = use("App/Models/Order");

class UserController {
  async store({ request, response }) {
    try {
      const data = request.only([
        "id",
        "email",
        "password",
        "name",
        "lastname",
        "phone"
      ]);
      const user = await User.create(data);
      return user;
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Algo não ocorreu bem!" } });
    }
  }

  async orderHistory({ params, request, response, auth }) {
    const { id } = await auth.getUser();

    const orders = await Order.query()
      .with("users")
      .where("user_id", id)
      .with("status")
      .with("products.arts")
      .fetch();

    return orders;
  }
}

module.exports = UserController;
