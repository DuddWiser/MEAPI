const express = require("express")
const app = express()
require('dotenv').config()
const main = require('./config/db')
const cors = require("cors");
app.use(express.json())
const userRoutes = require("./routes/userRoutes")

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true                 
}));


app.use('/api/user', userRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is running fine " });
});

const InitializeConnection = async()=>{

    try{
        await main(); 
        console.log("DB connected")
         app.listen(process.env.PORT,()=>{
         console.log("Server listening at "+ process.env.PORT)
         })
    }
    catch(err){
        console.log("Error: "+err)
    }
}

InitializeConnection()

