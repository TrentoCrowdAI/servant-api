require(__base + 'delegates/user-access.delegate.mocked');

const request = require('supertest');

const app = require(__base + 'app');

//set jest timeout to 20 seconds
jest.setTimeout(20000);

describe('Users controller', async () => {
    test('GET /users with email filter should return 200', async () => {
        let response = await request(app).get('/users?email=davide.zanella10@gmail.com');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        console.log(response.body);
    });

    test('GET /users/id should return 200 if the user exists', async () => {
        jest.mock(__base + 'dao/users.dao');
        const userDao = require(__base + 'dao/users.dao');
        userDao.get.mockReturnValue(Promise.resolve({ id: '1234' }));

        let response = await request(app).get('/users/1234');
        expect(response.status).toBe(200);
    })
});
