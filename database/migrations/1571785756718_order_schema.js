'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OrderSchema extends Schema {
  up() {
    this.create('orders', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.decimal('totalPrice').notNullable;
      table.text('observation');
      table.string('status', 255).notNullable;
      table.timestamps();
    });
  }

  down() {
    this.drop('orders');
  }
}

module.exports = OrderSchema;
