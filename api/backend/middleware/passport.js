const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: "./api/.env" });
const User = require('../models/userModel.js');

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
    }
    )
    )
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((user, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}