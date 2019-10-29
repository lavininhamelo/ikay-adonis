'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Package extends Model {
  art() {
    return this.belongsToMany('Art').pivotTable('package_art');
  }
  id() {
    return this.hasOne('App/Models/Product');
  }
}

module.exports = Package;
