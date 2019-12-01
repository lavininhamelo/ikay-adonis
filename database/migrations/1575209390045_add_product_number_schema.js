"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddOrderNumberSchema extends Schema {
  up() {
    this.alter("products", table => {
      table
        .integer("product_number")
        .notNullable()
        .unique();
    });
  }

  down() {
    this.alter("products", table => {
      table.dropColumn("product_number");
    });
  }
}

module.exports = AddOrderNumberSchema;
