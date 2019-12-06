"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Product extends Model {
  arts() {
    return this.hasOne("App/Models/Art", "id", "product_id");
  }
  order() {
    return this.belongsToMany(
      "App/Models/Order",
      "product_order",
      "product_id",
      "order_id"
    );
  }
  purchase() {
    return this.belongsToMany(
      "App/Models/User",
      "purchases",
      "product_id",
      "user_id"
    );
  }
}

module.exports = Product;
