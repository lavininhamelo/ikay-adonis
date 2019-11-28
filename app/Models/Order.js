"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
  users() {
    return this.belongsToMany("App/Models/User");
  }
  product() {
    return this.belongsToMany(
      "App/Model/Product",
      "product_order",
      "order_id",
      "product_id"
    );
  }
  status() {
    return this.hasOne("App/Models/OrderStatus");
  }
}

module.exports = Order;
