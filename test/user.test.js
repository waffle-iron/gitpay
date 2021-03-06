'use strict'

const assert = require('assert')
const request = require('supertest')
const expect = require('chai').expect
const api = require('../server')
const agent = request.agent(api)


describe('findAll User', () => {
    it('should find user', (done) => {
        agent
            .get('/getUserAll')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.exist;
                done();
            })
    })
})

describe('register User', () => {
    it('should register', (done) => {
        agent
            .post('/auth/register')
            .send({email: 'teste@gmail.com', password: 'teste'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.exist;
                done();
            })
    })
})

describe('login User Local', () => {
    it('should user local', (done) => {
        agent
            .post('/authorize/local')
            .send({email: 'teste@gmail.com', password: 'teste'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.exist;
                done();
            })
    })
})

describe('login User social networks', () => {
    it('should user authenticated', (done) => {
        agent
            .get('/authenticated')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.authenticated).to.equal(true);
                done();
            })
    })

    it('should user google', (done) => {
         agent
             .get('/authorize/google')
             .send({email: 'teste@gmail.com', password: 'teste'})
             .expect(302)
             .end((err, res) => {

                 expect(res.statusCode).to.equal(302);
                 expect(res.headers.location).to.include('https://accounts.google.com/o/oauth2/v2/auth?access_type=')
                 //expect(res.body.authenticated).to.equal(true);
                 done();
             })
    })
    it('should user bitbucket', (done) => {
      agent
        .get('/authorize/bitbucket')
        .send({email: 'teste@gmail.com', password: 'teste'})
        .expect(302)
        .end((err, res) => {

          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.include('https://bitbucket.org/api/1.0/oauth/authenticate/?oauth_token=')
          //expect(res.body.authenticated).to.equal(true);
          done();
        })
    })
})

