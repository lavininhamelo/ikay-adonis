"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Env = use("Env");
class File extends Model {
  productphotos() {
    return this.belongsTo("App/Models/ProductPhoto");
  }

  static get computed() {
    return ["url"];
  }
  getUrl({ id }) {
    return `${Env.get("APP_URL")}/files/${id}`;
  }
}

module.exports = File;
