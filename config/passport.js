'use strict'
const { google, facebook, github, oauthCallbacks, bitbucket } = require('./secrets');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy
const gitHubStrategy = require('passport-github2').Strategy;
const bitbucketStrategy = require('passport-bitbucket').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const requestPromise = require('request-promise');

const userExist = require('../modules/users').userExists;
const userBuild = require('../modules/users').userBuilds;
const userUpdat = require('../modules/users').userUpdate;
const Promise = require('bluebird');
var BitBucket = require('node-okbitbucket');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(

    new googleStrategy({
            clientID: google.id,
            clientSecret: google.secret,
            callbackURL: oauthCallbacks.googleCallbackUrl
        },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => {

                const attributes = {
                    access_token: accessToken,
                    refresh_token: refreshToken
                };

                const data = {
                    provider: 'google',
                    social_id: profile.id,
                    profile: profile,
                    attribute: attributes,
                    email: profile.emails[0].value
                }

                userExist(data)
                    .then((user) => {

                        if (user){

                            userUpdat(data)
                                .then((user) => {
                                    return done(null, user);
                                }).catch((error) => {
                                    console.log("Error in passport.js configuration file");
                                    console.log(error);
                                    return done(null);
                                });

                        }else{

                            userBuild(data)
                                .then((user) => {
                                    return done(null, user);
                                }).catch((error) => {
                                    console.log("Error in passport.js configuration file");
                                    console.log(error);
                                    return done(null);
                                });
                        }

                    }).catch((error) => {
                        console.log("Error in passport.js configuration file - search users");
                        console.log(error);
                        return done(null);
                    });
            });

        })

);

passport.use(

    new gitHubStrategy({
            clientID: github.id,
            clientSecret: github.secret,
            callbackURL: oauthCallbacks.githubCallbackUrl
        },
        (accessToken, accessTokenSecret, profile, done) => {
            process.nextTick(() => {

                const attributes = {
                    access_token: accessToken,
                    access_token_secret: accessTokenSecret
                };

                const data = {
                    provider: 'github',
                    social_id: profile.id,
                    profile: profile,
                    attribute: attributes,
                    email: profile.emails[0].value
                }

                userExist(data)
                    .then((user) => {

                        if(user){

                            userUpdat(data)
                                .then((user) => {
                                    return done(null, user);
                                }).catch((error) => {
                                    console.log("Error in passport.js configuration file");
                                    console.log(error);
                                    return done(null);
                                });

                        }else{
                            userBuild(data)
                                .then((user) => {
                                    return done(null, user);
                                }).catch((error) => {
                                    console.log("Error in passport.js configuration file");
                                    console.log(error);
                                    return done(null);
                                });
                        }

                    }).catch((error) => {
                        console.log("Error in passport.js configuration file - search users");
                        console.log(error);
                        return done(null);
                    });
            });

        })

);

passport.use(

    new facebookStrategy({
            clientID: facebook.id,
            clientSecret: facebook.secret,
            callbackURL: oauthCallbacks.facebookCallbackUrl
        },
        (accessToken, accessTokenSecret, profile, done) => {
            process.nextTick(() => {

                const attributes = {
                    access_token: accessToken,
                    access_token_secret: accessTokenSecret
                };

                const data = {
                    provider: 'facebook',
                    social_id: profile.id,
                    profile: profile,
                    attribute: attributes,
                    email: 'Checking a facebook setup'
                }

                userExist(data)
                    .then((user) => {

                        if(user){

                            userUpdate(data)
                                .then((user) => {
                                    return done(null, user);
                                }).catch((error) => {
                                    console.log("Error in passport.js configuration file");
                                    console.log(error);
                                    return done(null);
                                });

                        }else{

                            userBuild(data)
                                .then((user) => {
                                    return done(null, user);
                                }).catch((error) => {
                                    console.log("Error in passport.js configuration file");
                                    console.log(error);
                                    return done(null);
                                });
                        }

                    }).catch((error) => {
                        console.log("Error in passport.js configuration file - search users");
                        console.log(error);
                        return done(null);
                    });
            });

        })

);

passport.use(
  new bitbucketStrategy({
    consumerKey: bitbucket.id,
    consumerSecret: bitbucket.secret,
    callbackURL: oauthCallbacks.facebookCallbackUrl,
    profileWithEmail: true
  },
  function (accessToken, accessTokenSecret, profile, done) {
    process.nextTick(() => {
      const attributes = {
        access_token: accessToken,
        access_token_secret: accessTokenSecret
      };

      const data = {
        provider: profile.provider,
        social_id: profile.account_id,
        profile: profile,
        attribute: attributes,
        email: 'none@gitpay.me'
      }



      userExist(data)
        .then((user) => {
          if(user){
            userUpdate(data)
              .then((user) => {
                return done(null, user);
              }).catch((error) => {
              console.log("Error in passport.js configuration file");
              console.log(error);
              return done(null);
            });

          }else{
            userBuild(data)
              .then((user) => {
                return done(null, user);
              }).catch((error) => {
              console.log("Error in passport.js configuration file");
              console.log(error);
              return done(null);
            });
          }

        }).catch((error) => {
        console.log("Error in passport.js configuration file - search users");
        console.log(error);
        return done(null);
      });
    })
}));



passport.use(
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            process.nextTick(() => {

                const userAttributes = {
                    email: email
                }

                userExist(userAttributes)
                    .then((user) => {
                        if (!user) return done(null, false);
                        if (!user.verifyPassword(password, user.password)) return done(null, false);
                        return done(null, user);
                    }).catch((error) => {
                        return done(error);
                    })
            });

        })

);
