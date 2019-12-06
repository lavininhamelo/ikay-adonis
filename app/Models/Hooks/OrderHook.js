"use strict";
const Purchase = use("App/Models/Purchase");
const OrderHook = (exports = module.exports = {});

const STATUS = { PENDING: 1, WAITING_PAYMENT: 2, OK: 3 };

OrderHook.statusChanged = async order => {
  if (order.status_id === STATUS.OK) {
    //Se o status === PAGO, então...
    for (const data of await order.toJSON().products) {
      const { id } = order.toJSON().users;
      const purchase = await Purchase.create({
        user_id: id,
        product_id: data.id,
        remaining_uses: data.qntd
      });
    }
  }
};
