"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ProductPhoto extends Model {
  files() {
    return this.hasMany("App/Models/File");
  }
  products() {
    return this.belongsTo("App/Models/Product");
  }
}

module.exports = ProductPhoto;
