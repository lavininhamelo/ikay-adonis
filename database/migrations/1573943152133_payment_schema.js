'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PaymentSchema extends Schema {
  up() {
    this.create('payments', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('order_id')
        .unsigned()
        .references('id')
        .inTable('orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('status_id')
        .unsigned()
        .references('id')
        .inTable('status_types')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.date('payment_date').notNullable();
      table.decimal('payment_value').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('payments');
  }
}

module.exports = PaymentSchema;
