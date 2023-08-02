'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::order.order');

module.exports = createCoreController('api::order.order', ({ strapi}) => ({
    async create(ctx){
        const result = await super.create(ctx);

        // // // with SNAP
         const midtransClient = require('midtrans-client');
        // // Create Snap API instance
         let snap = new midtransClient.Snap({
                 isProduction : false,
                 serverKey : 'SB-Mid-server-eBEW4sxUMQjrWqrGfllsRqE9',
                 clientKey : 'SB-Mid-client-q3rhMsnl9ausTqXN'
             });

         let parameter = {
             "transaction_details": {
                 "order_id": result.data.id,
                 "gross_amount": result.data.attributes.totalPrice
             }, "credit_card":{
                 "secure" : true
             }
         };

         let response = await snap.createTransaction(parameter)



        // // // with CORE API

        //const midtransClient = require('midtrans-client');
        //// Create Core API instance
        //let core = new midtransClient.CoreApi({
          //      isProduction : false,
            //    serverKey : 'SB-Mid-server-eBEW4sxUMQjrWqrGfllsRqE9',
              //  clientKey : 'SB-Mid-client-q3rhMsnl9ausTqXN'
            //});

        //let parameter = {
          //  "payment_type": "gopay",
//            "transaction_details": {
  //              "gross_amount": result.data.attributes.totalPrice,
    //            "order_id": result.data.id,
      //      },
        //    "credit_card":{
          //      "token_id": 'CREDIT_CARD_TOKEN', // change with your card token
            //    "authentication": true
            //}
        //};

        // charge transaction
        //let response = await core.charge(parameter);
        //// END CORE API

        
        
        return response;
        // return {"result" : "success"};
    }
}) );
