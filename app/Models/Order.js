'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Order extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }
  product() {
    return this.belongsToMany('Product').pivotTable('order_product');
  }
}

module.exports = Order;
