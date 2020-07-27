const express = require("express");
const { Buyer, Order, Product } = require("./models");

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
    Buyer.findAll({
        include: [
            {
                model: Product
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        })
});

app.listen(PORT, ()=>{
    console.log("APP berjalan di " + PORT);
})