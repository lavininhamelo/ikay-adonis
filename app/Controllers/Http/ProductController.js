"use strict";
const Product = use("App/Models/Product");
const ProductPhoto = use("App/Models/ProductPhoto");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const products = await Product.query()
      .with("arts")
      .fetch();

    if (products.length === 0) {
      return "No products is avaliable";
    }
    return products;
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response }) {}

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      "name",
      "description",
      "original_price",
      "type",
      "status"
    ]);
    const product = Product.create(data);
    return product;
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const product = await Product.query()
      .has("arts")
      .fetch();
    return product;
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response }) {}

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}

  async setCapa({ params, request, response }) {
    const product = await Product.query()
      .where({ id: params.product_id })
      .fetch();

    if (product.toJSON().length > 0) {
      await Product.query()
        .where({
          id: params.product_id
        })
        .update({
          capa: params.product_photo_id
        });
      return Product.query()
        .where({ id: params.product_id })
        .fetch();
    }

    return response
      .status(400)
      .send({ mesage: "No product exists for set capa." });
  }
}

module.exports = ProductController;
