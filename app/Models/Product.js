'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  order() {
    return this.belongsToMany('Order').pivotTable('order_product');
  }
}

module.exports = Product;
