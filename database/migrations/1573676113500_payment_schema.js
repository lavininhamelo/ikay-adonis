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
      table.date('date_payment').notNullable();
      table.integer('status_id').table.timestamps();
    });
  }

  down() {
    this.drop('payments');
  }
}

module.exports = PaymentSchema;
