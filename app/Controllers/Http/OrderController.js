"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Order = use("App/Models/Order");
const Product = use("App/Models/Product");
const OrderProduct = use("App/Models/OrderProduct");
const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const orders = await Order.query()
      .with("users")
      .with("status")
      .with("products.arts")
      .fetch();

    return orders;
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const { id } = await auth.getUser();
    const data = request.only([
      "status_id",
      "observation",
      "products",
      "order_number"
    ]);

    try {
      const order = await Order.create({
        user_id: id,
        status_id: data.status_id,
        observation: data.observation,
        order_number: data.order_number
      });

      for (var i = 0; i < data.products.length; i++) {
        await order.products().attach(data.products[i].id, row => {
          row.qntd = data.products[i].qntd;
          row.current_price = data.products[i].current_price;
        });
      }

      await order.load("products");

      return order;
    } catch (e) {
      // return response.status(501).send("Não foi possivel realizar a compra!");
      return e;
    }
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const orders = await Order.query()
      .with("products")
      .where("order_number", params.order_number)
      .fetch();
    return orders;
  }

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response }) {}

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const order = await Order.findOrFail(params.id);
    order.delete();

    response.status(204).send({ message: "Deletada com sucesso!" });
  }
}

module.exports = OrderController;
