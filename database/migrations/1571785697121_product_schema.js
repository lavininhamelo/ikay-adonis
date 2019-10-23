'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 255).notNullable()
      table.text('description')
      table.decimal('price').notNullable()
      table.string('type',32).notNullable()
      table.boolean('published').notNullable()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
