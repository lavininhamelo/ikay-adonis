'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class StatusType extends Model {
  payments() {
    return this.belongsToMany('App/Models/Payment');
  }
}

module.exports = StatusType;
