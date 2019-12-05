"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
  static boot() {
    super.boot();
    this.addHook("afterUpdate", "OrderHook.statusChanged");
  }
  users() {
    return this.belongsTo("App/Models/User");
  }
  products() {
    return this.belongsToMany("App/Models/Product");
  }
  status() {
    return this.hasOne("App/Models/OrderStatus", "status_id", "id");
  }
  static get hidden() {
    return ["status_id", "user_id"];
  }
}

module.exports = Order;
