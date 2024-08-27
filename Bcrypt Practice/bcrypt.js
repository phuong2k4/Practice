// bcrypt improt module
import bcrypt, { hash } from "bcrypt";
import express from 'express';
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const saltRound = 10;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req,res)=>{
    res.render("index.ejs");
})

// example
// bcrypt.hash(password,saltRound,(err,hash)=>{
//     if(err){
//         console.log("Error hashing password", err.message);
//     }else{
//         console.log("Hashed complete");
//         console.log(hash);
//     }
// } )

app.post("/submit", (req,res)=>{
    const password = req.body.password;
    bcrypt.hash(password, saltRound, (err,hash)=>{
        if(err){
            console.log("Error hashing password", err.message);
            res.redirect("/")
        }else{
            res.render("pass-after-hashing.ejs", {
                pass_hashing: hash
            })
        }
    })
})



app.listen(port, ()=>{
    console.log(`Running on port: http://localhost:${port}`)
})