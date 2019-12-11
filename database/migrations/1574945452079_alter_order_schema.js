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
        .onDelete("CASCADE")
        .defaultTo(1);
    });
  }

  down() {
    this.alter("orders", table => {
      table.dropForeign("status_id");
    });
  }
}

module.exports = AlterOrderSchema;
