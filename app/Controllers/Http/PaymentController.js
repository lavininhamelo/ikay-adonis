'use strict';
var paypal = require('paypal-rest-sdk');
var paypalConfig = require('../../../config/payment/paypal');
class PaymentController {
  constructor() {
    paypal.configure(paypalConfig);
  }
  async make({ request, response }) {
    let product = request.body.product;
    var create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: `${process.env.APP_URL}/payment/success`,
        cancel_url: `h${process.env.APP_URL}/payment/cancel`
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: product.name,
                sku: 'plan',
                price: product.price,
                currency: 'BRL',
                quantity: product.quantity
              }
            ]
          },
          amount: {
            currency: 'BRL',
            total: product.price
          },
          description: 'Plano Basico do iKay'
        }
      ]
    };

    await paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
        throw error;
      } else {
        console.log('Create Payment Response');
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            console.log(payment.links[i].href);
            return response.redirect(payment.links[i].href);
          }
        }
      }
    });
  }
  async success({ request, response }) {
    let { paymentId, PayerID } = request.all();
    var execute_payment_json = {
      payer_id: PayerID,
      transactions: [
        {
          amount: {
            currency: 'BRL',
            total: '49.90'
          }
        }
      ]
    };
    return await paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function(error, payment) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          console.log('Get Payment Response');
          console.log(JSON.stringify(payment));
        }
      }
    );
  }
}

module.exports = PaymentController;
