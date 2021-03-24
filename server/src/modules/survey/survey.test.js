const mongoose = require('mongoose');
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai');
const faker = require('faker');
const _ = require('lodash');
const server = require('../../../index');

/* eslint prefer-destructuring: 0 */
const expect = chai.expect;
chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Surveys APIs', () => {
  let user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };

  let survey = {
    title: faker.name.title(),
    description: faker.lorem.sentence()
  };

  describe('# POST /api/auth/register', () => {
    it('should create a new user for creating survey', (done) => {
      request(server)
        .post('/api/auth/register')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.token).to.not.equal('');
          expect(res.body.token).to.not.equal(undefined);
          expect(res.body.user.email).to.equal(user.email);
          expect(res.body.user.firstName).to.equal(user.firstName);
          expect(res.body.user.lastName).to.equal(user.lastName);
          expect(res.body.user.password).to.equal(undefined); // Password should be removed.
          user = res.body.user;
          user.token = res.body.token;
          done();
        })
        .catch(done);
    });
  });

  describe('# POST /api/surveys', () => {
    it('should create a new survey', (done) => {
      request(server)
        .post('/api/surveys')
        .send(survey)
        .set({ Authorization: `Bearer ${user.token}` })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.owner).to.equal(user._id);
          expect(res.body.title).to.equal(survey.title);
          expect(res.body.description).to.equal(survey.description);
          survey = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/surveys/', () => {
    it('should get all surveys', (done) => {
      request(server)
        .get('/api/surveys')
        .set({ Authorization: `Bearer ${user.token}` })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# Error Handling', () => {
    it('should handle express validation error - title is required', (done) => {
      request(server)
        .post('/api/surveys')
        .send({
          description: faker.lorem.sentence(),
        })
        .set({ Authorization: `Bearer ${user.token}` })
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"title" is required');
          done();
        })
        .catch(done);
    });
  });
});
