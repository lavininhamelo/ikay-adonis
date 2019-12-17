"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductPhotoSchema extends Schema {
  up() {
    this.create("product_photos", table => {
      table.increments();
      table
        .integer("product_id")
        .unsigned()
        .unique()
        .references("id")
        .inTable("products")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("file_id")
        .unsigned()
        .unique()
        .references("id")
        .inTable("files")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.timestamps();
    });
  }

  down() {
    this.drop("product_photos");
  }
}

module.exports = ProductPhotoSchema;
