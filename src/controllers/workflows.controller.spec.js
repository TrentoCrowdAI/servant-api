require(__base + 'delegates/user-access.delegate.mocked');

const request = require('supertest');

const app = require(__base + 'app');

//set jest timeout to 20 seconds
jest.setTimeout(20000);

describe('Workflows controller', async () => {
  test('GET /workflows/aaa should return 400', async () => {
    let response = await request(app).get('/workflows/aaa');
    expect(response.status).toBe(400);
  });

  test('POST /workflows/0 should return 404', async () => {
    let response = await request(app).post('/workflows/0');
    expect(response.status).toBe(404);
  });

  test('Right workflow insert, get, update, delete', async () => {

    let work = {
      id_project: 0,
      data: {
        name: "test",
        blocks: []
      }
    };

    //POST /workflows should return 201 ad the id has to be defined if the new workflow is created
    let response = await request(app).post('/workflows').send(work);
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    let workRes = response.body;

    //GET /workflows/id should return 200
    response = await request(app).get('/workflows/' + workRes.id);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    //PUT /workflows/id should return 200
    response = await request(app).put('/workflows/' + workRes.id).send(work);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();


    //DELETE /workflows/id should return 200
    response = await request(app).delete('/workflows/' + workRes.id);
    expect(response.status).toBe(200);
  });

  test('GET /workflows should return 200', async () => {
    let response = await request(app).get('/workflows');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});