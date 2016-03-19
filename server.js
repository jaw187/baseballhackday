const Server = require('./lib');

Server((err, server) => {

    if (err) {
        throw err;
    }

    console.log('Server started at', server.info.uri);
});
