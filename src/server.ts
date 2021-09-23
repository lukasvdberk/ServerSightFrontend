import sirv from 'sirv';
const express = require('express');
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express() // You can also use Express

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
)

app.listen(PORT, (err) => {
	if (err) console.log('error', err);
});

export default app
