import passport from "passport";
import GitHubStrategy from 'passport-github';
import dotenv from "dotenv";

dotenv.config();


export function Oauth_Github(){
    passport.use(new GitHubStrategy({
        clientID: process.env.github_id,
        clientSecret: process.env.github_secret,
        callbackURL: "http://localhost:3000/auth/github/callback",
        
    },(accsessToken, refreshToken, profile, callback)=>{
        return callback(null, profile)
    }))
    passport.serializeUser((user,cb)=>{
        return cb(null,user);
    })
    passport.deserializeUser((user,cb)=>{
        return cb(null,user);
    })
    
}

export default Oauth_Github;