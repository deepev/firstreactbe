const app = require('../../app');
const supertest = require('supertest');
const { describe, expect } = require('@jest/globals');

describe('User', () => {
    /**
     * 1. User register cases
     */

    describe('user register successfully', () => {
        const register_url = 'api/user/register';
        it('it should return 201 response', async () => {
            const payload = {
                name: 'jest testing',
                email: 'jesttesting@test.com',
                password: 'test123',
            };
            const response = await supertest(app)
                .post(register_url)
                .send(payload);
            expect(response.statusCode).toBe(201);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('code', 'SUCCESS');
            expect(response.body).toHaveProperty(
                'message',
                'User has been created successfully.',
            );
            expect(response.body.data).toHaveProperty('name');
            expect(response.body.data).toHaveProperty('email');

            const { name, email } = response.body.data;

            expect(typeof name).toBe('string');
            expect(typeof email).toBe('string');
        });

        it('it should return 422 if user already exits', async () => {
            const payload = {
                name: 'jest testing',
                email: 'jesttesting@test.com',
                password: 'test123',
            };

            const response = await supertest(app)
                .post(register_url)
                .send(payload);
            expect(response.statusCode).toBe(422);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('code', 'ERROR');
            expect(response.body).toHaveProperty(
                'message',
                'This User already exists.',
            );
        });
    });

    /**
     * 2 User login cases
     */

    describe('User login successfully', () => {
        const login_url = '/api/user/login';
        it('it should return 200 response', async () => {
            const payload = {
                email: 'jesttesting@test.com',
                password: 'test123',
            };

            const response = await supertest(app).post(login_url).send(payload);

            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('code', 'SUCCESS');
            expect(response.body).toHaveProperty(
                'message',
                'Login successfully',
            );
            expect(response.body.data).toHaveProperty('name');
            expect(response.body.data).toHaveProperty('email');
            expect(response.body.data).toHaveProperty('token');
            const { name, email, token } = response.body.data;

            expect(typeof name).toBe('string');
            expect(typeof email).toBe('string');
            expect(typeof token).toBe('string');
        });

        it('it should return 422 response for password wrong', async () => {
            const payload = {
                email: 'jesttesting@test.com',
                password: 'test1234',
            };
            const response = await supertest(app).post(login_url).send(payload);

            expect(response.statusCode).toBe(422);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('code', 'ERROR');
            expect(response.body).toHaveProperty(
                'message',
                'Password do not match, please enter correct Password',
            );
        });

        it('it should return 422 response for invalid email or user not found', async () => {
            const payload = {
                email: 'jesttesting222@test.com',
                password: 'test1234',
            };

            const response = await supertest(app).post(login_url).send(payload);
            expect(response.statusCode).toBe(422);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('code', 'ERROR');
            expect(response.body).toHaveProperty(
                'message',
                `There’s no account found with this Email.`,
            );
        });
    });

    /**
     * 3 Get All user list cases
     */

    describe('Get all user list', () => {
        it('it should return 200 response', async () => {
            const response = await supertest(app).get('/api/user/list');
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('code', 'SUCCESS');
            expect(response.body).toHaveProperty(
                'message',
                'All User have been obtained successfully.',
            );
            expect(response.body.data).toBeInstanceOf(Array);
            const users = response.body.data;
            users.forEach((element) => {
                expect(element).toHaveProperty('name');
                expect(element).toHaveProperty('email');
                expect(element).toHaveProperty('refreshToken');
                expect(typeof element.name).toBe('string');
                expect(typeof element.email).toBe('string');
                expect(typeof element.refreshToken).toBe('string');
            });
        });
    });
});
