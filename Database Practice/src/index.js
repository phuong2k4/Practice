import express from "express"
import dotenv from "dotenv";
import bcrypt, { hash } from "bcrypt"
import pg from "pg";
import bodyParser from "body-parser";
dotenv.config();
const app = express();
const {port} = process.env;
const saltRound = 5;
const db = new pg.Client({
    database: "practice",
    user:"postgres",
    password: "0",
    port: 5432,
    host: "localhost"
})
db.connect();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(express.static("public"))

app.get("/", (req, res)=>{
    res.render("index.ejs")
})

app.get("/login", (req,res)=>{
    res.render("login.ejs")
})
app.get("/secret", (req,res)=>{
    res.render("secret/secret.ejs")
})
app.post("/add", async (req,res)=>{
    try{
        bcrypt.hash(req.body.password, saltRound ,(err,hash)=>{
            if (err){
                console.log("hash password not complete")
            }else{
                try{
                    db.query("insert into users (email, passwrd) values ($1,$2)", [req.body.email, hash])
                }
                catch(err){
                    console.log(err.message)
                    res.redirect("/")
                }
            }
        })
        res.render("secret/secret.ejs")        
    }catch(err){
        console.error(err.stack)    
        res.redirect("/")   
    }
})

app.post("/log", async (req,res)=>{
    const password = req.body.password;
    try{
        const data = await db.query("select * from users where email=($1)",[req.body.email])
        const user = data.rows[0]
        console.log(user)
        bcrypt.compare(password,user.passwrd, (err,result)=>{
            if (err){
                console.error(err.stack)
            }else{
                if (result){
                    res.redirect("/secret")
                }else{
                    res.redirect("/login")
                }
            }
        })
    }catch(err){
        console.log(err.message)
    }   
})


app.listen(port, ()=>console.log(`http://localhost:${port}`));