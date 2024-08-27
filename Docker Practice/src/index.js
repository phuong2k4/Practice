import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config()
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req,res)=>{
    res.json({
        status: 200,
        message:"complete"
    })
})

app.listen(PORT,()=>{
    console.log(`running on http://localhost:${PORT}`);
})