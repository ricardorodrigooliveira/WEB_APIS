const webServer = require('./services/web-server.js');
const database = require('./services/database.js');
const dbConfig = require('./config/database.js');
const defaultThreadPoolSize = 4;

process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;

//async function startup(){
async function startup(){
    console.log('Starting application');
    try {
        console.log('Initialize database module');

        await database.initialize();
    } catch (err) {
        console.error(err);
        
        process.exit(1);
    }

    try {
        console.log('Initializing web server module');

        webServer.initialize();
    } catch (err) {
        console.error(err);

        process.exit(1);
    }
}

startup();

async function shutdown(e) {
    let err = e;

    console.log('Shutting down');

    try {
        console.log('Closing web server module');

        await webServer.close();
    } catch (e) {
        console.log('Encountered error', e);

        err = err || e;
    }

    try {
        console.log('Closing database module');

        await database.close();
    } catch {
        console.log('Encountered error', e);

        err = err || e;
    }

    console.log('Exiting process');

    if(err) {
        process.exit(1);
    } else {
        process.exit(0);
    }
}

process.on('SIGTERM', () => {
    console.log('Received SIGINT');

    shutdown();
});

process.on('uncaughtException', err => {
    console.log('Uncaught exception');

    console.log(err);

    shutdown(err);
});