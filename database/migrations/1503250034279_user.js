"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table.string("name", 254).notNullable();
      table.string("lastname", 254).notNullable();
      table.string("phone", 30).notNullable();
      table.boolean("isVerified").defaultTo(false);
      table.string("token");
      table.timestamp("token_created_at");
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
