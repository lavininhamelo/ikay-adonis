"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

//Users routes
Route.post("users", "UserController.store");
Route.post("login", "SessionController.store");
Route.post("forgotPassword", "ForgotPasswordController.store");
Route.put("newPassword", "ForgotPasswordController.update");

//Order routes
Route.get("orders", "OrderController.index");
Route.post("orders", "OrderController.store").middleware("auth");
Route.get("orders/:order_number", "OrderController.show");
Route.delete("orders/:id", "OrderController.destroy");
Route.patch("orders/:id", "OrderController.update");

//Product routes
Route.get("products", "ProductController.index");
Route.get("products/:id", "ProductController.show");
Route.post("products", "ProductController.store");

//Art routes
Route.get("arts", "ArtController.index");
Route.get("arts/:product_number", "ArtController.show");
Route.post("arts", "ArtController.store");
Route.delete("arts/:id", "ArtController.destroy");

//Purchase routes
Route.get("purchases/:order_id", "PurchaseController.store");
