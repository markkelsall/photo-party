import express from 'express';
import os from 'os';
import morgan from 'morgan';
import logger from './logger';

const morganEnv = process.env.NODE_ENV === 'dev' ? 'dev' : 'common';
const PORT = 3000;

const app = express();

app.use(morgan(morganEnv, {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.use(morgan(morganEnv, {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => {
    logger.debug('Debug statement');
    logger.info('Info statement');
    res.send({username: os.userInfo().username})
});

app.listen(8080, () => logger.info('Listening on port: ' + PORT));
