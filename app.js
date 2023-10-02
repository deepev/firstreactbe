const express = require('express');
const catchAsync = require('./src/helpers/catchAsync');
const { toTitleCase, localize } = require('./src/helpers/localize');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const FilesystemBackend = require('i18next-node-fs-backend');
const path = require('path');
const config = require('./src/config/config');
const util = require('./src/helpers/messages');
const cors = require('cors');
const connectDB = require('./src/config/db');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
const app = express();

app.use(cors(corsOptions));
global.catchAsync = catchAsync;
global._toTitleCase = toTitleCase;
global._localize = localize;
global.util = util;

// DB connection
connectDB().then(() => console.log('MongoDB successfully establish'));

i18next
    .use(FilesystemBackend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        lng: 'en',
        ns: ['file', 'specificMessage', 'common'],
        defaultNS: ['file', 'specificMessage', 'common'],
        backend: {
            loadPath: path.join(__dirname, `/src/lang/{{lng}}/{{ns}}.json`),
            addPath: path.join(__dirname, `/src/lang/{{lng}}/{{ns}}.json`),
        },
        detection: {
            order: ['header', 'querystring' /*, "cookie"*/],
            lookupHeader: 'lng',
            caches: false,
        },
        fallbackLng: 'en',
        preload: ['en'],
    });
app.use(i18nextMiddleware.handle(i18next));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(config.API_PREFIX, require('./src/routes'));
app.use(express.static('public'));

module.exports = app;
