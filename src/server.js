'use strict';

// loads env config
const config = require('configMap');
const app = require('./app');

const port = process.env.API_PORT ?? 5000;
const host = process.env.API_HOST ?? 'http://localhost';

app.listen(port, () => {
    let information = `\nListening at port: ${port} \n\nOpen: ${host}:${port} \n`;

    console.log(information);
});
