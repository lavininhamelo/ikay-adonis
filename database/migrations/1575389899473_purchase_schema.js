"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PurchaseSchema extends Schema {
  up() {
    this.create("purchases", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("product_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("products")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("remaining_uses")
        .unsigned()
        .notNullable()
        .defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("purchases");
  }
}

module.exports = PurchaseSchema;
