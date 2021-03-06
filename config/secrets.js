if(process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const databaseDev = {
  username: 'postgres',
  password: 'postgres',
  database: 'gitpay',
  host: '127.0.0.1',
  port: 5432,
  dialect: 'postgres',
  logging: false
}

const databaseTest = {
  username: 'postgres',
  password: 'postgres',
  database: 'gitpay',
  host: '127.0.0.1',
  port: 5432,
  dialect: 'postgres',
  logging: false
}

const databaseProd = {
  username: 'root',
  password: null,
  database: process.env.DATABASE_URL,
  schema: 'public',
  host: '127.0.0.1',
  port: 5432,
  dialect: 'postgres',
  protocol: 'postgres'
}

const facebook = {
  id: process.env.FACEBOOK_ID,
  secret: process.env.FACEBOOK_SECRET
}

const google = {
  id: process.env.GOOGLE_ID,
  secret: process.env.GOOGLE_SECRET
}

const github = {
  id: process.env.GITHUB_ID,
  secret: process.env.GITHUB_SECRET
}

const bitbucket = {
  id: process.env.BITBUCKET_ID,
  secret: process.env.BITBUCKET_SECRET
}

const oauthCallbacks = {
  googleCallbackUrl: 'http://localhost:3000/callback/google',
  githubCallbackUrl: 'http://localhost:3000/callback/github',
  facebookCallbackUrl: 'http://localhost:3000/callback/facebook',
  facebookCallbackUrl: 'http://localhost:3000/callback/bitbucket'
}

module.exports = { databaseDev, databaseTest, databaseProd, facebook, google, github, bitbucket, oauthCallbacks }
