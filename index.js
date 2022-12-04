const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const cors = require("cors");
const connection = require('./setup_db');



require('dotenv').config();

app.use(express.json());

app.use(cors());


app.get('/',(req,res)=> {
res.send('Running');
});

//POST ORDER
app.post("/order", async (req, res) => {
    const customerName = req.body.customerName;
    const deliveryAddress = req.body.deliveryAddress;
    const orderTakerName = req.body.orderTakerName;
    const orderItemsModel = req.body.orderItemsModel;
    const deliveryDate = req.body.deliveryDate;

    



    console.log(customerName);
    console.log(deliveryAddress);
    console.log(orderTakerName);
    console.log(deliveryDate);
    console.log(orderItemsModel);

    
  


  
      try {
      var orderID =   Math.floor(Math.random() * 1000000000);

      ///Insert in ORDER Table
        var sql1 = `INSERT INTO ORDERS (ID, CUSTOMER_NAME, DELIVERY_ADDRESS, ORDER_TAKER_NAME, DELIVERY_DATE,CREATED_AT) VALUES ("${orderID}", "${customerName}", "${deliveryAddress}", "${orderTakerName}", "${deliveryDate}", NOW())`;

        connection.query(sql1, function (err, result) {
            if (err) throw err
            console.log('Row has been updated, Order Added SuccessFully'),
            console.log(result);        
        })


        // Insert in ORDER_ITEMS
        for (var i = 0; i < orderItemsModel.length; i++) {
            console.log(orderItemsModel[i]); 
            const orderItems = orderItemsModel[i];
            var sql2 = `INSERT INTO ORDER_ITEMS (ORDER_ID, PRODUCT_NAME, PRODUCT_UNIT,PRODUCT_UNIT_PRICE,QUANTITY,TOTAL,SORT_NUMBER)  VALUES ("${orderID}","${orderItems["productModel"]["productName"]}", "${orderItems["productModel"]["unit"]}", "${orderItems["productModel"]["price"]}", "${orderItems["quantity"]}","${orderItems["total"]}","${orderItems["sortNumber"]}")`; 

          }
        
      res.status(200).json({
        message : "Order Added Successfully"
      });
        //  connection.query()
          connection.end();
  
      }
       catch (err) {
           console.log(err);
         res.status(500).json({message:err});
      }
    });

app.listen(4000,"0.0.0.0",()=> {
    console.log('Backend is Running');
})