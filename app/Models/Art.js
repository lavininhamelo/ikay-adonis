'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Art extends Model {
  package() {
    return this.belongsToMany('Package').pivotTable('package_art');
  }
  id() {
    return this.hasOne('App/Models/Product');
  }
}

module.exports = Art;
