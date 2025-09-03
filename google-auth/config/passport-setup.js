// Import the 'passport' library, which is used for user authentication
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Stored user data in the session
passport.serializeUser((user, done) => {
  done(null, user); 
});

// Retrieve user object from the session
passport.deserializeUser((obj, done) => {
  done(null, obj); 
});

// Configure the Google strategy for Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL: '/auth/google/callback' 
  },

  // This function is called after Google has authenticated the user
  (accessToken, refreshToken, profile, done) => {
    const user = { // Google user ID
      id: profile.id, 
      displayName: profile.displayName, 
      emails: profile.emails, 
      photos: profile.photos 
    };
    done(null, user);
  }
));