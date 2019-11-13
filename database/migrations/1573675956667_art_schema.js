'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ArtSchema extends Schema {
  up() {
    this.create('arts', table => {
      table.increments();
      table.string('category', 100);
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
  }

  down() {
    this.drop('arts');
  }
}

module.exports = ArtSchema;
