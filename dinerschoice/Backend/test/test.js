const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const api_url = 'http://localhost:3001';

const { expect } = chai;

it('GET allevents available', (done) => {
  chai
    .request(api_url)
    .get('/allEvents')
    .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFrc2h5YS5rcmlzaG5hbkBzanN1LmVkdSIsImlhdCI6MTYwMjM3MzkyMywiZXhwIjoxNjAyNDYwMzIzfQ.quv-DYiU1Ndwlcf2VOXyKDeZ2gp5XdADisTG8d2hfyA')
    .send()
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
});

it('POST login as restaurant', (done) => {
  chai
    .request(api_url)
    .post('/login')
    .send({
      category: 'Restaurant',
      email: 'contactus@sushan.com',
      password: '123456',
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
});

it('POST register for event', (done) => {
  chai
    .request(api_url)
    .post('/registerfor')
    .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFrc2h5YS5rcmlzaG5hbkBzanN1LmVkdSIsImlhdCI6MTYwMjQwODcwNSwiZXhwIjoxNjAyNDk1MTA1fQ.E9-QnEkEGCW9FWGnIHHht0KFNIPrnJPoNqRFz3kV0xg')
    .send({
      eventID: 2,
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
});

it('GET restaurant profile', (done) => {
  chai
    .request(api_url)
    .get('/restaurantDashboard')
    .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNvbnRhY3R1c0BzdXNoYW4uY29tIiwiaWF0IjoxNjAyNDA3OTU3LCJleHAiOjE2MDI0OTQzNTd9.lWVV1i3uuBzRjSYStESNZs3qbPeuKDXhENGsfcR45_8')
    .send()
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
}).timeout(3500);

it('GET customer reviews', (done) => {
  chai
    .request(api_url)
    .get('/getCustReviews')
    .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFrc2h5YS5rcmlzaG5hbkBzanN1LmVkdSIsImlhdCI6MTYwMjQwODcwNSwiZXhwIjoxNjAyNDk1MTA1fQ.E9-QnEkEGCW9FWGnIHHht0KFNIPrnJPoNqRFz3kV0xg')
    .send()
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
}).timeout(3000);
