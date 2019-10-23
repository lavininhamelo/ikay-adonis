'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderProductSchema extends Schema {
  up () {
    this.create('order_product', (table) => {
      table.increments()
      table.number('uses')
      table.timestamps()

    })
  }

  down () {
    this.drop('order_product')
  }
}

module.exports = OrderProductSchema
