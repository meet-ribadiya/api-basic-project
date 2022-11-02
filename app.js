// const express = require("express");
// require("./db/conn.js");
// const app = express();
// const port = process.env.port || 5000;


// app.post("/student", (req, res) => {
//     res.send("hello from the other side");

// })
// app.listen(port, () => {
//     console.log(`connection is setup at ${port}`);  
// })

//another way to code

const express = require('express');
const connectDB = require('./db/conn');
connectDB();
const Product = require('./model/product');
const app = express();

app.use(express.json());
app.post("/create", async (req, resp) => {
    let data = new Product(req.body);
    const result = await data.save();
    resp.send(result);
});

app.get("/list", async (req, resp) => {
    let data = await Product.find();
    resp.send(data);
})

app.delete("/delete/:_id", async (req, resp) => {
    console.log(req.params)
    let data = await Product.deleteOne(req.params);
    resp.send(data);
})

app.put("/update/:_id", async (req, resp) => {
    console.log(req.params)
    let data = await Product.updateOne(
        req.params,
        { $set: req.body }
    );
    resp.send(data);
})

app.listen(5000)


