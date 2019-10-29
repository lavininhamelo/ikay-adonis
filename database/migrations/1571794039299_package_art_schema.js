'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PackageArtSchema extends Schema {
  up() {
    this.create('package_art', table => {
      table.increments();
      table
        .integer('art_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('arts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('package_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('packages')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('package_art');
  }
}

module.exports = PackageArtSchema;
