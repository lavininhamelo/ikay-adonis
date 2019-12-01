"use strict";

/** @type {import("@adonisjs/lucid/src/Schema")} */
const Schema = use("Schema");

class AddOrderNumberSchema extends Schema {
  up() {
    this.alter("orders", table => {
      table
        .integer("order_number")
        .notNullable()
        .unique();
    });
  }

  down() {
    this.alter("orders", table => {
      table.dropColumn("order_number");
    });
  }
}

module.exports = AddOrderNumberSchema;
