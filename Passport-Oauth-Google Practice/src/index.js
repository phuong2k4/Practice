import express from "express"
import session from "express-session"
import passport from "passport"
import GoogleStrategy from "passport-google-oauth2"
import dotenv from "dotenv"

dotenv.config();
const app = express();
const {port, key_session} = process.env;
const store = session.MemoryStore();

app.use(express.json());
app.use(express.static("public"))
app.use(session({
    secret:key_session,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000*60
    },
    store
}))

app.use(passport.initialize());
app.use(passport.session());

app.get("/status",(req,res)=>{
    res.status(200).json({
        status: 200,
        message: "Port is running"
    })
} )

app.get("/", (req,res)=>{
    res.render("index.ejs")
})

app.get("/profile", (req,res)=>{
    if(req.isAuthenticated()){
        res.send(`<h1>Hello ${req.user.email}</h1>`)
    }
    else{
        res.send("<h1>Logged not commision!</h1>")
    }
})

app.get("/auth/google", passport.authenticate('google', {
    scope:['email', 'profile']
}))

app.get("/auth/google/callback", passport.authenticate('google', {
    successRedirect:"/profile",
    failureRedirect:"/auth/google/failure"
}))

app.get("/auth/google/failure", (req,res)=>{
    res.json({
        status:400,
        message:"User not found"
    })
})

passport.use(new GoogleStrategy({
    clientID:     process.env.google_id,
    clientSecret: process.env.google_secret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser((user, cb)=>{
    return cb(null, user)
})

passport.deserializeUser((user, cb)=>{
    return cb(null, user)
})

app.listen(port, ()=>console.log(`running on port http://localhost:${port}`))