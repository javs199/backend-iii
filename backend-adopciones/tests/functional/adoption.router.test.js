const request = require('supertest');
const app = require('../../src/app');
const resetFakeData = require('../../src/data/resetFakeData');
const adoptionService = require('../../src/services/adoption.service');

beforeEach(() => {
  resetFakeData();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Adoption Router Functional Tests', () => {

  describe('GET /api/adoptions', () => {
    it('Debe responder 200, devolver status success, y un payload que inicialmente es un array vacío', async () => {
      const response = await request(app).get('/api/adoptions');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body).toHaveProperty('payload');
      expect(Array.isArray(response.body.payload)).toBe(true);
      expect(response.body.payload.length).toBe(0);
    });

    it('Debe devolver un array con datos después de crear una adopción', async () => {
      // Crear una adopción
      await request(app).post('/api/adoptions/u1/p1');

      // Obtener todas las adopciones
      const response = await request(app).get('/api/adoptions');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(Array.isArray(response.body.payload)).toBe(true);
      expect(response.body.payload.length).toBe(1);
      expect(response.body.payload[0].userId).toBe('u1');
      expect(response.body.payload[0].petId).toBe('p1');
    });

    it('Debe responder 500 si ocurre un error interno', async () => {
      jest.spyOn(adoptionService, 'getAllAdoptions').mockImplementation(() => {
        throw new Error('Simulated internal error');
      });
      const response = await request(app).get('/api/adoptions');
      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
    });
  });

  describe('POST /api/adoptions/:uid/:pid', () => {
    it('Debe crear una adopción correctamente y demostrar que la mascota ya no puede ser adoptada', async () => {
      // Crear adopción correctamente
      const response = await request(app).post('/api/adoptions/u1/p1');
      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body).toHaveProperty('payload');
      expect(response.body.payload).toHaveProperty('id');
      expect(response.body.payload.userId).toBe('u1');
      expect(response.body.payload.petId).toBe('p1');
      expect(response.body.payload).toHaveProperty('createdAt');
      
      // Demostrar funcionalmente que la mascota quedó adoptada al intentar adoptarla de nuevo
      const duplicatedResponse = await request(app).post('/api/adoptions/u2/p1');
      expect(duplicatedResponse.status).toBe(409);
      expect(duplicatedResponse.body.status).toBe('error');
    });

    it('Debe responder 404 si el usuario no existe', async () => {
      const response = await request(app).post('/api/adoptions/u999/p1');
      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
    });

    it('Debe responder 404 si la mascota no existe', async () => {
      const response = await request(app).post('/api/adoptions/u1/p999');
      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
    });

    it('Debe responder 500 si ocurre un error interno durante la creación', async () => {
      jest.spyOn(adoptionService, 'createAdoption').mockImplementation(() => {
        throw new Error('Simulated internal error');
      });
      const response = await request(app).post('/api/adoptions/u1/p1');
      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
    });
  });

  describe('GET /api/adoptions/:aid', () => {
    it('Debe devolver la adopción solicitada', async () => {
      // Crear adopción primero
      const postResponse = await request(app).post('/api/adoptions/u1/p1');
      const adoptionId = postResponse.body.payload.id;

      // Consultar adopción
      const response = await request(app).get(`/api/adoptions/${adoptionId}`);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body).toHaveProperty('payload');
      expect(response.body.payload.id).toBe(adoptionId);
      expect(response.body.payload.userId).toBe('u1');
      expect(response.body.payload.petId).toBe('p1');
    });

    it('Debe responder 404 cuando la adopción no exista', async () => {
      const response = await request(app).get('/api/adoptions/a999');
      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
    });

    it('Debe responder 500 si ocurre un error interno al consultar la adopción', async () => {
      jest.spyOn(adoptionService, 'getAdoptionById').mockImplementation(() => {
        throw new Error('Simulated internal error');
      });
      const response = await request(app).get('/api/adoptions/a1');
      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
    });
  });

  describe('DELETE /api/adoptions/:aid', () => {
    it('Debe eliminar la adopción, devolver sus datos y permitir que la mascota sea adoptada de nuevo', async () => {
      // Crear adopción
      const postResponse = await request(app).post('/api/adoptions/u1/p1');
      const adoptionId = postResponse.body.payload.id;

      // Eliminar adopción
      const response = await request(app).delete(`/api/adoptions/${adoptionId}`);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body).toHaveProperty('payload');
      expect(response.body.payload.id).toBe(adoptionId);
      expect(response.body.payload.userId).toBe('u1');
      expect(response.body.payload.petId).toBe('p1');

      // Permitir adoptar nuevamente la misma mascota después del DELETE
      const postResponse2 = await request(app).post('/api/adoptions/u2/p1');
      expect(postResponse2.status).toBe(201);
      expect(postResponse2.body.status).toBe('success');
    });

    it('Debe responder 404 si la adopción no existe al intentar eliminar', async () => {
      const response = await request(app).delete('/api/adoptions/a999');
      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
    });

    it('Debe responder 500 si ocurre un error interno al eliminar la adopción', async () => {
      jest.spyOn(adoptionService, 'deleteAdoption').mockImplementation(() => {
        throw new Error('Simulated internal error');
      });
      const response = await request(app).delete('/api/adoptions/a1');
      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
    });
  });
});
