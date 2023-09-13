import express from 'express';
import routes from './src/routes';
import { catchAsync } from './src/helpers/catchAsync';
import { toTitleCase, localize } from './src/helpers/localize';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import FilesystemBackend from 'i18next-node-fs-backend';
import path from 'path';
import config from './src/config/config';
import util from './src/helpers/messages';
import cors from 'cors';
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
import cookieParser  from 'cookie-parser';
const app = express();

app.use(cors(corsOptions));
app.use(cookieParser ());
global.catchAsync = catchAsync;
global._toTitleCase = toTitleCase;
global._localize = localize;
global.util = util;


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
app.use(config.API_PREFIX, routes);
app.use(express.static('public'));

export default app;