var chai = require('chai');
var request = require('supertest');


describe('Timeline feature', function(){
  var app;

  beforeEach(function(){
    app = require('./server')();
  });

  it('display no tweets', function(done) {
    getTimeline()
      .expect(200, {'timeline': []}, done);
  });

  it('accepts a new tweet', done => {
    postTweet('hello world!')
      .expect(204, '', done);
  });

  it('display my only tweet', function(done) {
    postTweet('hello world!')
      .end(function(){
        getTimeline()
          .expect(200, 
            {'timeline': [{'message': 'hello world!', 'user': 'mob'}]},
              done)});
  });


  it('displays my two tweets', done => 
    postTweet('hello David').end(() =>
      postTweet('hello world').end(() => 
        getTimeline()
          .expect(200,
            havingTweets(
              {'message': 'hello David', 'user': 'mob'},
              {'message': 'hello world', 'user': 'mob'}),
               done)
          )
      )
    );

  var havingTweets = (...tweets) => { 
    return {'timeline': tweets} 
  };

  function postTweet(messageBody) {
    return request(app)
    .post('/tweet')
      .set('Content-Type', 'application/json')
      .send({'message': messageBody})
  }

  function getTimeline() {
    return request(app)
      .get('/timeline');
  }
});