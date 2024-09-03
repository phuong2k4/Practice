import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import Oauth_Github from "./oauth-github.js";

dotenv.config();
Oauth_Github();
const app = express();
const {port, key_session} = process.env;
const store = session.MemoryStore();


app.use(express.json());
app.use(express.static("public"))
app.use(session({
    saveUninitialized:false,
    secret:key_session,
    cookie:{
        maxAge:1000 * 30
    },
    store
}))

app.use(passport.initialize())
app.use(passport.session())

app.get("/status", (req,res)=>{
    res.status(200).json({
        message:"Server is running!"
    })
})

app.get("/", (req,res)=>{
    res.render("index.ejs")
})

app.get("/profile", (req,res)=>{
    const user = req.user._json.name;
    if(req.isAuthenticated()){
        res.status(200).send(`<h1>Wellcome to Oauth Practice! ${user}</h1>`)
    }else{
        res.status(400).send("<h1>User doesnt exsist</h1>")
    }
})

app.get("/auth/github", passport.authenticate('github', {
    scope:["user:email"]
}))

app.get("/auth/github/callback", passport.authenticate('github', {
    successRedirect: "/profile",
    failureRedirect: "/auth/github/failure"
}))

app.get("/auth/github/failure", (req,res)=>{
    res.json({
        status: 200,
        message: "login not submission!"
    })
})
app.listen(port, ()=>console.log(`running on http://localhost:${port}`))