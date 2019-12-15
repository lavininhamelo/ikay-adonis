"use strict";
const ProductPhoto = use("App/Models/ProductPhoto");
const Product = use("App/Models/Product");

class ProductPhotoController {
  async store({ params, request, response }) {
    const product_photo = await ProductPhoto.create({
      product_id: params.product_id,
      file_id: params.id
    });
    return product_photo;
  }
  async index({ params, request, response }) {
    const product_photo = await ProductPhoto.query()
      .with("products")
      .where("product_id", params.id)
      .with("files")
      .fetch();

    return product_photo;
  }
  async setCapa({ params, request, response }) {}
}

module.exports = ProductPhotoController;
