'use strict';
const config = require('config');
const morgan = require('morgan');

module.exports = function () {

    // set env variable
    // export NODE_ENV=production
    // export app_password=1234 - prefix 'password' to avoid collision with other pass
    // set env variable for debugging
    // export DEBUG=app:startup
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`app: ${app.get('env')}`);

    // Config
    const appName = config.get('name');
    const mail = config.get('mail.host');
    const jwtPrivateKey = config.get('jwtPrivateKey');
    //const mailPass = config.get('mail.password');
    console.log(`Application Name: ${appName}`);
    console.log(`mail: ${mail}`);
    console.log(`jwtPk: -> ${jwtPrivateKey}`);
    //console.log(`mailPass: ${mailPass}`);

    if (app.get('env') === 'development') {
        //morgan logs requests info.
        app.use(morgan('tiny'));
        console.log('morgan Enabled.');
    }

    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined');

        // to set env variable
        // on mac: export <appName>_jwtPrivateKey=<keyvalue>
        // on windows: set <appName>_jwtPrivateKey=<keyvalue>
    }
}