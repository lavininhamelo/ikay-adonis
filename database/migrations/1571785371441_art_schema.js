'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtSchema extends Schema {
  up () {
    this.create('arts', (table) => {
      table.increments()
      table.string('category',255)
      table.number('uses')
      table.timestamps()
    })
  }

  down () {
    this.drop('arts')
  }
}

module.exports = ArtSchema
