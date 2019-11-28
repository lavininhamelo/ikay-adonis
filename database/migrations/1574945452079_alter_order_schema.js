"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AlterOrderSchema extends Schema {
  up() {
    this.alter("orders", table => {
      table
        .integer("status_id")
        .unsigned()
        .references("id")
        .inTable("order_status")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.alter("orders", table => {
      table.dropColumn("status");
    });
  }
}

module.exports = AlterOrderSchema;
