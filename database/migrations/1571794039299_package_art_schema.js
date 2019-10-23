'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PackageArtSchema extends Schema {
  up () {
    this.create('package_art', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('package_art')
  }
}

module.exports = PackageArtSchema
