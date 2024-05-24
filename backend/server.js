
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());


const userRoute = require("./routes/userRoute")



app.use(express.json());

mongoose.connect(process.env.URI).then(()=>{
    console.log("Connected MongoDB");
    app.listen(process.env.PORT || 8000);
}).catch((error)=>{
    console.log(error)
})

app.use(userRoute);




