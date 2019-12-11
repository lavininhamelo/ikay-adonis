"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class OrderStatus extends Model {
  static get table() {
    return "order_status";
  }
  orders() {
    return this.belongsToMany("App/Models/Order");
  }

  static get hidden() {
    return ["created_at", "updated_at"];
  }
}

module.exports = OrderStatus;
