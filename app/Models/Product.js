"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Product extends Model {
  productphotos() {
    return this.hasMany("App/Models/ProductPhoto");
  }
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
  user() {
    return this.belongsToMany(
      "App/Models/User",
      "purchases",
      "product_id",
      "user_id"
    );
  }
  capa() {
    return this.hasOne("App/Models/ProductPhoto");
  }
}

module.exports = Product;
