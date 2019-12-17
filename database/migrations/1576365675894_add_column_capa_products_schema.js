"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddColumnCapaProductsSchema extends Schema {
  up() {
    this.alter("products", table => {
      table
        .integer("capa")
        .unsigned()
        .references("id")
        .inTable("product_photos")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
    });
  }

  down() {
    this.alter("products", table => {
      table.dropColumn("capa");
    });
  }
}

module.exports = AddColumnCapaProductsSchema;
