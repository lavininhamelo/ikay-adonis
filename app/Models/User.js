"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }
  orders() {
    return this.hasMany("App/Models/Order");
  }

  purchases() {
    return this.hasMany("App/Models/Product");
  }

  static get computed() {
    return ["fullname"];
  }

  getFullname({ name, lastname }) {
    return `${name} ${lastname}`;
  }
  purchases() {
    return this.belongsTo("App/Models/Product");
  }
}

module.exports = User;
