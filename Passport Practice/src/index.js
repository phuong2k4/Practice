import express from "express";
// import bodyParser from "body-parser";
import passport from "passport"
import session from "express-session"
import {Strategy} from "passport-local";
import dotenv from "dotenv"
import bcrypt from "bcrypt"

const app = express();
const saltRound = 10;
dotenv.config()
const {PORT,KEY_SESSION} = process.env
const store = session.MemoryStore();

// app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

app.use(session({
    saveUninitialized: false,
    secret: KEY_SESSION,
    cookie:{
        maxAge: 1000*10 //6s
    },
    store
}))

app.use(passport.initialize());
app.use(passport.session())

app.get('/status', (req,res)=>{
    res.status(200).json({
        status:'success',
        message: 'ok'
    })
})

app.get('/profile', (req,res)=>{
    if(req.isAuthenticated()){
        res.status(200).json({
            status:'success',
            message: 'ok'
        })
    }else{
        res.json({
            status:"failure",
            message:"not complete"
        })
    }
    
})

app.post('/login', passport.authenticate('local', {
    successRedirect:"/profile",
    failureRedirect:"/login"
}), (req,res)=>{
    try {
        res.json({
            body: req.body.username
        })
    } catch (error) {
        res.json({
            error: error.stack
        })
    }
})

const user = {
    username:'david',
    password:"123"
}


async function HashFuncion(userPassword, clientPassword){
    try{
        const hashUser = await bcrypt.hash(userPassword,saltRound)
        const hashClient = await bcrypt.hash(clientPassword,saltRound)
        return {hashClient,hashUser}
    }catch(err){
        console.log(err.message)
    }
    
}


passport.use(new Strategy( async (username,password, cb)=>{
    console.log(`username::${username}, password::${password}`)
    const {hashClient, hashUser} = await HashFuncion(user.password,password)

    bcrypt.compare(hashUser, hashClient,(err,result)=>{
        if (err){
            console.error("wrong password");
        }else{
            if(result){
                return cb(null, {
                    username,
                    password,
                    active: true
                });
            }else{
                return cb(null,false)
            }
        }
    })
}))



passport.serializeUser((user,cb)=>{
    cb(null, user);
})
passport.deserializeUser((user,cb)=>{
    cb(null, user);
})

app.listen(PORT, ()=>{
    console.log(`running on port http://localhost:${PORT}`)
})