const request = require('supertest');
const { Genre, validateGenre } = require('../../models/genres');
let server;

describe('api/genres', () => {
  beforeEach(() => { server = require('../../app') });
  afterEach(async () => {
    server.close();
    await Genre.remove({}); // clean DB
  });
  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" }
      ]);
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a genre if valid Id is passed', async () => {
      const genre = new Genre({ name: 'genre3' });
      await genre.save();
      console.log('genre: ', genre);
      const res = await request(server).get(`/api/genres/${genre._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });
  });

  describe('GET /:id', () => {
    it('should return 404 if invalid Id is passed', async () => {
      const res = await request(server).get(`/api/genres/45`);

      expect(res.status).toBe(404);
    });
  });
});