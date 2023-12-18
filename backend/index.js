const express=require("express");
const app=express();
const port=5000
const mongoDB=require("./db");
const cors=require('cors');
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

app.use(express.json())
app.use(cors({
    origin:["https://restaurant-app-mernstack-22.vercel.app"],
    methods:["POST","GET"],
    credentials:true
}));
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
app.get('/',(req,res)=>{
    res.send("Hello World");
});
mongoDB() 
    .then(() => {
        app.listen(port, () => {
            console.log("Server started successfully!!!");
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
