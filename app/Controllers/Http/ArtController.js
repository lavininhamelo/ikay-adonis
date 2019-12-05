"use strict";
const Art = use("App/Models/Art");
const Product = use("App/Models/Product");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with arts
 */

class ArtController {
  /**
   * Show a list of all arts.
   * GET arts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const arts = await Art.query()
      .with("products")
      .fetch();
    return arts;
  }

  /**
   * Render a form to be used for creating a new art.
   * GET arts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new art.
   * POST arts
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
      "status",
      "product_number",
      "category"
    ]);

    //Create product
    const { id } = await Product.create({
      name: data.name,
      description: data.description,
      original_price: data.original_price,
      type: data.type,
      product_number: data.product_number,
      status: data.status
    });

    //Create art
    const artData = {
      product_id: id,
      category: data.category
    };

    const art = await Art.create(artData);

    return art;
  }

  /**
   * Display a single art.
   * GET arts/:product_number
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {
    const arts = await Product.query()
      .with("arts")
      .where("product_number", params.product_number)
      .fetch();

    if (arts.rows.length == 0) {
      return response.status(204).send({
        message: `Product(${params.product_number}) does not exists.`
      });
    }
    return arts;
  }
  /**
   * Render a form to update an existing art.
   * GET arts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update art details.
   * PUT or PATCH arts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a art with id.
   * DELETE arts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const product = await Product.findOrFail(params.id);
    product.delete();
    response.status(204).send({ message: "Deletada com sucesso!" });
  }
}

module.exports = ArtController;
