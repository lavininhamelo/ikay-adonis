"use strict";

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Database = use("Database");

class ProductSeeder {
  async run() {
    const products = await Database.table("products");
    console.log(products);
  }
}

module.exports = ProductSeeder;
