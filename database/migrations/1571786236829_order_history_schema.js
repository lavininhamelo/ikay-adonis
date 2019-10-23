'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderHistorySchema extends Schema {
  up () {
    this.create('order_history', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('order_history')
  }
}

module.exports = OrderHistorySchema
