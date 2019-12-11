"use strict";
const Purchase = use("App/Models/Purchase");
const User = use("App/Models/User");
const Product = use("App/Models/Product");
const Database = use("Database");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with purchases
 */
class PurchaseController {
  /**
   * Show a list of all purchases.
   * GET purchases
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new purchase.
   * GET purchases/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new purchase.
   * POST purchases
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response }) {
    const purchases = await Database.table("order_product").where(
      "order_id",
      params.order_id
    );
    console.log(params.order_id);
    console.log(purchases);
    return purchases;
  }

  /**
   * Display a single purchase.
   * GET purchases/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, auth }) {
    const { id } = await auth.getUser();

    const purchases = await Database.table("purchases")
      .innerJoin("products", "purchases.product_id", "products.id")
      .where("user_id", id);

    return purchases;
  }

  /**
   * Render a form to update an existing purchase.
   * GET purchases/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update purchase details.
   * PUT or PATCH purchases/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = await auth.getUser();
    const purchase = await Purchase.findByOrFail({
      product_id: params.id,
      user_id: id
    });

    if (purchase.remaining_uses === 0) {
      return response.status(400).send({ message: "Product is equal 0" });
    }
    purchase.remaining_uses -= 1;
    purchase.save();
    return purchase;
  }

  /**
   * Delete a purchase with id.
   * DELETE purchases/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = PurchaseController;
