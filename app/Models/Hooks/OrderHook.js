"use strict";
const Purchase = use("App/Models/Purchase");
const Database = use("Database");
const OrderProduct = use("App/Models/OrderProduct");
const STATUS = { PENDING: 1, WAITING_PAYMENT: 2, OK: 3 };
const OrderHook = (exports = module.exports = {});

async function checkIfProductExists(user_id, product_id) {
  const purchase = await Database.table("purchases")
    .where({
      product_id: product_id,
      user_id: user_id
    })
    .first();
  return purchase;
}

OrderHook.statusChanged = async order => {
  if (order.status_id === STATUS.OK) {
    //Se o status === PAGO, então...
    for (const data of await order.toJSON().products) {
      const { id } = await order.toJSON().users;
      const order_product = await OrderProduct.query()
        .where({
          product_id: data.pivot.product_id,
          order_id: data.pivot.order_id
        })
        .fetch();

      const { qntd } = await order_product.toJSON()[0];

      const isExists = await checkIfProductExists(id, data.pivot.product_id);
      if (isExists) {
        const total = qntd + isExists.remaining_uses;
        const purchase = await Database.table("purchases")
          .where({
            product_id: data.pivot.product_id,
            user_id: id
          })
          .update({ remaining_uses: total });
      } else {
        const purchase = await Purchase.create({
          user_id: id,
          product_id: data.id,
          remaining_uses: qntd
        });
      }
    }
  }
};
