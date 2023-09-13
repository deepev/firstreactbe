export default {
    PORT: process.env.PORT || 8000,

    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/Task',

    JWT_SECRET:  process.env.JWT_SECRET || 'thisismysecret',

    API_PREFIX: process.env.API_PREFIX || '/api'
}