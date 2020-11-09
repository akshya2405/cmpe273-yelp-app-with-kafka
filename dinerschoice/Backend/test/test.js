const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const api_url = 'http://localhost:3001';

const { expect } = chai;

// it('GET allevents available', (done) => {
//   chai
//     .request(api_url)
//     .get('/allEvents')
//     .set('common.authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXRlZ29yeSI6IkN1c3RvbWVyIiwiZW1haWwiOiJnbG9AZ21haWwuY29tIiwiaWQiOiI1ZmEzNTk2MDhmZDMyNDZmMjIwNzY3MDYiLCJpYXQiOjE2MDQ4NzEyMDgsImV4cCI6MTYwNTczNTIwOH0.9i4zv9b5tBUZKEr8upJpmbRCbhXBNYO-UVeYj19v3Ac')
//     .send()
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       done();
//     });
// });

it('POST login as restaurant', (done) => {
  chai
    .request(api_url)
    .post('/user/login')
    .send({
      category: 'Restaurant',
      email: 'su@abc.com',
      password: '123456',
    })
    .end((err, res) => {
      console.log(res.status);
      expect(res).to.have.status(200);
      done();
    });
});

// it('POST register for event', (done) => {
//   chai
//     .request(api_url)
//     .post('/registerfor')
//     .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFrc2h5YS5rcmlzaG5hbkBzanN1LmVkdSIsImlhdCI6MTYwMjQwODcwNSwiZXhwIjoxNjAyNDk1MTA1fQ.E9-QnEkEGCW9FWGnIHHht0KFNIPrnJPoNqRFz3kV0xg')
//     .send({
//       eventID: 2,
//     })
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       done();
//     });
// });

it('GET restaurant profile', (done) => {
  chai
    .request(api_url)
    .get('/restaurantDashboard')
    .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXRlZ29yeSI6IkN1c3RvbWVyIiwiZW1haWwiOiJnbG9AZ21haWwuY29tIiwiaWQiOiI1ZmEzNTk2MDhmZDMyNDZmMjIwNzY3MDYiLCJpYXQiOjE2MDQ4NzEyMDgsImV4cCI6MTYwNTczNTIwOH0.9i4zv9b5tBUZKEr8upJpmbRCbhXBNYO-UVeYj19v3Ac')
    .send()
    .end((err, res) => {
      console.log(res.status);
      expect(res).to.have.status(200);
      done();
    });
}).timeout(3500);

// it('GET customer reviews', (done) => {
//   chai
//     .request(api_url)
//     .get('/getCustReviews')
//     .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFrc2h5YS5rcmlzaG5hbkBzanN1LmVkdSIsImlhdCI6MTYwMjQwODcwNSwiZXhwIjoxNjAyNDk1MTA1fQ.E9-QnEkEGCW9FWGnIHHht0KFNIPrnJPoNqRFz3kV0xg')
//     .send()
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       done();
//     });
// }).timeout(3000);
