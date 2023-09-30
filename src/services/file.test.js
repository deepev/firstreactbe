const { it, describe, expect, afterAll } = require('@jest/globals');
const supertest = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

jest.setTimeout(10000);
// jest.useFakeTimers();

const common_headers = {
    Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTA5YTlmZjMwMmJkZDEwYjE4YTUwZmQiLCJuYW1lIjoiZXYyIiwiZW1haWwiOiJldjJAdGVzdC5jb20iLCJpYXQiOjE2OTYwNzMxNTEsImV4cCI6MTY5NjA3Njc1MX0.aza_25TFodf5MgKhQDcR6aPl7Nm5rt5SIlpRAbMiE0s',
    'Content-Type': 'application/json',
};

describe('File', () => {
    /**
     * 1. file not found with wrong id
     */

    describe('Wrong fileId', () => {
        it('should return 422', async () => {
            const id = mongoose.Types.ObjectId('6516abd851b71827f361849a');

            const response = await supertest(app)
                .get(`/api/file/get/${id}`)
                .set(common_headers);

            expect(response.statusCode).toBe(422);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('code', 'ERROR');
            expect(response.body).toHaveProperty(
                'message',
                `File not found or you can't obtained this File`,
            );

            /**
             * then and catch approach
             */
            // supertest(app)
            //     .get(`/api/file/get/${id}`)
            //     .set(common_headers)
            //     .then((response) => {
            //         expect(response.statusCode).toBe(422);
            //         expect(response.body).toBeDefined();
            //         expect(response.body).toHaveProperty('code', 'ERROR');
            //         expect(response.body).toHaveProperty(
            //             'message',
            //             `module.getError`,
            //         );
            //     })
            //     .catch((error) => {
            //         console.log('error: ', error);
            //     });
        });
    });

    /**
     * 2. single file details with id
     */

    describe('Get File details', () => {
        it('should return 200', async () => {
            const id = mongoose.Types.ObjectId('6516abd851b71827f361849f');

            const response = await supertest(app)
                .get(`/api/file/get/${id}`)
                .set(common_headers);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('code', 'SUCCESS');
            expect(response.body).toHaveProperty(
                'message',
                'File has been obtained successfully.',
            );
            expect(response.body.data).toHaveProperty('path');
            expect(response.body.data).toHaveProperty('created_by');
            expect(response.body.data).toHaveProperty('originalName');
            expect(response.body.data).toHaveProperty('fileName');
            expect(response.body.data).toHaveProperty('fileType');

            /**
             * then and catch approach
             */
            // supertest(app)
            //     .get(`/api/file/get/${id}`)
            //     .set(common_headers)
            //     .then((response) => {
            //         expect(response.statusCode).toBe(200);
            //         expect(response.body).toBeDefined();
            //         expect(response.body).toHaveProperty('code', 'SUCCESS');
            //         expect(response.body).toHaveProperty(
            //             'message',
            //             'File has been obtained successfully.',
            //         );
            //         expect(response.body.data).toHaveProperty('path');
            //         expect(response.body.data).toHaveProperty('created_by');
            //         expect(response.body.data).toHaveProperty('originalName');
            //         expect(response.body.data).toHaveProperty('fileName');
            //         expect(response.body.data).toHaveProperty('fileType');
            //     })
            //     .catch((error) => {
            //         console.log('error: ', error);
            //     });
        });
    });

    /**
     * 3. most uploaded file list with aggregation
     */

    describe('Get most uploaded files', () => {
        it('most uploaded file has been fetched', async () => {
            const response = await supertest(app)
                .get(`/api/file/list`)
                .set(common_headers);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('code', 'SUCCESS');
            expect(response.body).toHaveProperty(
                'message',
                'All File have been obtained successfully.',
            );
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data.length).toBeGreaterThanOrEqual(1);
            const firstElement = response.body.data[0];
            expect(firstElement).toHaveProperty('types');
            expect(firstElement.types).toBeInstanceOf(Array);
            firstElement.types.forEach((type) => {
                expect(type).toHaveProperty('name');
                expect(type).toHaveProperty('total');
                expect(typeof type.name).toBe('string');
                expect(typeof type.total).toBe('number');
            });

            /**
             * then and catch approach
             */
            // supertest(app)
            //     .get(`/api/file/list`)
            //     .set(common_headers)
            //     .then((response) => {
            //         expect(response.statusCode).toBe(200);
            //         expect(response.body).toBeDefined();
            //         expect(response.body).toHaveProperty('code', 'SUCCESS');
            //         expect(response.body).toHaveProperty(
            //             'message',
            //             'All File have been obtained successfully.',
            //         );
            //         expect(response.body.data).toBeInstanceOf(Array);
            //         expect(response.body.data.length).toBeGreaterThanOrEqual(1);
            //         const firstElement = response.body.data[0];
            //         expect(firstElement).toHaveProperty('types');
            //         expect(firstElement.types).toBeInstanceOf(Array);
            //         firstElement.types.forEach((type) => {
            //             expect(type).toHaveProperty('name');
            //             expect(type).toHaveProperty('total');
            //             expect(typeof type.name).toBe('string');
            //             expect(typeof type.total).toBe('number');
            //         });
            //     })
            //     .catch((error) => {
            //         console.log('error: ', error);
            //     });
        });
    });

    /**
     * 4. all file list
     */

    const payload = {
        options: {
            offset: 0,
            limit: 10,
            sort: {
                createdAt: -1,
            },
            populate: [
                {
                    path: 'created_by',
                    select: 'name',
                },
            ],
            select: '-updatedAt -_id',
        },
        query: {
            searchColumns: ['originalName', 'fileName'],
            search: '',
            fileType: {
                $in: ['pdf', 'png'],
            },
            created_by: mongoose.Types.ObjectId('650816dfa60572f8a5610eb9'),
        },
    };

    describe('Get All File details', () => {
        it('all file has been fetched with 200', async () => {
            const response = await supertest(app)
                .post(`/api/file/list`)
                .send(payload)
                .set(common_headers);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body).toHaveProperty('code', 'SUCCESS');
            expect(response.body).toHaveProperty(
                'message',
                'All Files have been obtained successfully.',
            );
            const {
                totalDocs,
                offset,
                limit,
                totalPages,
                page,
                pagingCounter,
                hasPrevPage,
                prevPage,
                nextPage,
                hasNextPage,
            } = response.body.data;
            expect(response.body.data).toHaveProperty('totalDocs');
            expect(response.body.data).toHaveProperty('offset');
            expect(response.body.data).toHaveProperty('limit');
            expect(response.body.data).toHaveProperty('totalPages');
            expect(response.body.data).toHaveProperty('page');
            expect(response.body.data).toHaveProperty('pagingCounter');
            expect(response.body.data).toHaveProperty('hasPrevPage');
            expect(response.body.data).toHaveProperty('prevPage');
            expect(response.body.data).toHaveProperty('nextPage');
            expect(response.body.data.docs).toBeInstanceOf(Array);
            expect(totalDocs).toBe(1);
            expect(offset).toBe(0);
            expect(limit).toBe(10);
            expect(totalPages).toBe(1);
            expect(page).toBe(1);
            expect(pagingCounter).toBe(1);
            expect(hasPrevPage).toBeFalsy();
            expect(hasNextPage).toBeFalsy();
            expect(prevPage).toBeNull();
            expect(nextPage).toBeNull();
            const files = response.body.data.docs;
            files.forEach((file) => {
                expect(file).toHaveProperty('path');
                expect(file).toHaveProperty('originalName');
                expect(file).toHaveProperty('created_by');
                expect(file).toHaveProperty('fileName');
                expect(file).toHaveProperty('fileType');
                expect(typeof file.path).toBe('string');
                expect(typeof file.originalName).toBe('string');
                expect(typeof file.fileName).toBe('string');
                expect(typeof file.fileType).toBe('string');
            });

            /**
             * then and catch approach
             */
            // supertest(app)
            //     .post(`/api/file/list`)
            //     .set(common_headers)
            //     .then((response) => {
            //         expect(response.statusCode).toBe(200);
            //         expect(response.body).toBeDefined();
            //         expect(response.body).toHaveProperty('code', 'SUCCESS');
            //         expect(response.body).toHaveProperty(
            //             'message',
            //             'All Files have been obtained successfully.',
            //         );
            //         const {
            //             totalDocs,
            //             offset,
            //             limit,
            //             totalPages,
            //             page,
            //             pagingCounter,
            //             hasPrevPage,
            //             prevPage,
            //             nextPage,
            //             hasNextPage,
            //         } = response.body.data;
            //         expect(response.body.data).toHaveProperty('totalDocs');
            //         expect(response.body.data).toHaveProperty('offset');
            //         expect(response.body.data).toHaveProperty('limit');
            //         expect(response.body.data).toHaveProperty('totalPages');
            //         expect(response.body.data).toHaveProperty('page');
            //         expect(response.body.data).toHaveProperty('pagingCounter');
            //         expect(response.body.data).toHaveProperty('hasPrevPage');
            //         expect(response.body.data).toHaveProperty('prevPage');
            //         expect(response.body.data).toHaveProperty('nextPage');
            //         expect(response.body.data.docs).toBeInstanceOf(Array);
            //         expect(totalDocs).toBe(11);
            //         expect(offset).toBe(0);
            //         expect(limit).toBe(10);
            //         expect(totalPages).toBe(2);
            //         expect(page).toBe(1);
            //         expect(pagingCounter).toBe(1);
            //         expect(hasPrevPage).toBeFalsy();
            //         expect(hasNextPage).toBeTruthy();
            //         expect(prevPage).toBeNull();
            //         expect(nextPage).toBe(2);
            //         const files = response.body.data.docs;
            //         files.forEach((file) => {
            //             expect(file).toHaveProperty('path');
            //             expect(file).toHaveProperty('originalName');
            //             expect(file).toHaveProperty('created_by');
            //             expect(file).toHaveProperty('fileName');
            //             expect(file).toHaveProperty('fileType');
            //             expect(typeof file.path).toBe('string');
            //             expect(typeof file.originalName).toBe('string');
            //             expect(typeof file.fileName).toBe('string');
            //             expect(typeof file.fileType).toBe('string');
            //         });
            //     })
            //     .catch((error) => {
            //         console.log('error: ', error);
            //     });
        });
    });
});
