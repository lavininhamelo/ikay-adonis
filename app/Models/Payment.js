'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Payment extends Model {
  status() {
    return this.hasOne('App/Models/StatusType');
  }
}

module.exports = Payment;
