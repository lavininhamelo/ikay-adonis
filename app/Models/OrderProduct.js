"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class OrderProduct extends Model {
  static get table() {
    return "order_product";
  }
}

module.exports = OrderProduct;
