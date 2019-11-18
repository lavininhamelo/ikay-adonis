'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Art extends Model {
  products() {
    return this.belongsTo('App/Models/Product');
  }
}

module.exports = Art;
