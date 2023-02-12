const express  = require("express");
const app = express();
const BodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 9500;
const mongoose = require("mongoose");
const url = `mongodb+srv://test:root@cluster0.bhlqwzf.mongodb.net/API?retryWrites=true&w=majority`;

// middlewares
app.use(cors());
app.use(express.json());
app.use(BodyParser.urlencoded({extended: true}));

// connection with db
mongoose.connect(url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("connection!");
}).catch((err) => {
    console.log("No connection!");
})

// category schema 
const categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    discount: {
        type: String,
        require: true
    },
    feature: {
        type: Boolean,
        require: true
    }
});

const Data = new mongoose.model("categorydata", categorySchema);

// product schema 
const productSchema = new mongoose.Schema({
    category: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    discount: {
        type: String,
        require: true
    },
    feature: {
        type: Boolean,
        require: true
    },
    Product_id: {
        type: Number,
        require: true
    },
    Product_name: {
        type: String,
        require: true
    },
    Product_rating: {
        type: Number,
        require: true
    },
    Product_price: {
        type: String,
        require: true
    }
});

const myData = new mongoose.model("productdata", productSchema);


// post category data
app.post("/category", async (req, res) => {
    try{
        const data = await Data(req.body); 
        res.status(201).send(data);
        data.save();  
    }catch(err){
        res.send(err);
    }
})

// post product data
app.post("/product", async (req, res) => {
    try{
        const data = await myData(req.body); 
        res.status(201).send(data);
        data.save();  
    }catch(err){
        res.send(err);
    }
});

// fetch category data
app.get("/category", async (req, res) => {
    try{
        const getCategory = await Data.find(req.query).sort({id: 1});
        res.status(200).send(getCategory);
    }catch(err){
        res.send(err)
    }
});

// fetch product data
app.get("/product", async (req, res) => {
    try{
        const getProduct = await myData.find(req.query).sort({Product_id: 1});
        res.status(200).send(getProduct);
    }catch(err){
        res.send(err);
    }
})











// Listening the server
app.listen(port, () => {
    console.log(`Server is started at:${port}`);
})