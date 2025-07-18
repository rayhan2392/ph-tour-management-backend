/* eslint-disable no-console */
import { Server } from 'http'

import mongoose from 'mongoose';
import app from './app';
import { envVars } from './app/config/env';



let server: Server;



const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)
        console.log('connected to DB!!')
        server = app.listen(envVars.PORT, () => {
            console.log(`server is listening on ${envVars.PORT}`)
        })

    } catch (error) {
        console.log(error)
    }
}

startServer();

//signal termination error(comes from virtual server)
process.on("SIGTERM", () => {
    console.log('Signal termination detected...server shuting down...')
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})

//signal initialization error(comes from sudden off of local server)
process.on("SIGINT", () => {
    console.log('Signal initialization detected...server shuting down...')
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})


//managing unhandled error

process.on("unhandledRejection", (err) => {
    console.log('Unhandled Rejection detected...server shuting down...', err)
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})

//managing uncaght error

process.on("uncaughtException", (err) => {
    console.log('Uncaught exception detected...server shuting down...', err)
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})


//unhandled rejection error
// Promise.reject(new Error('I forgot to handle this promise'))


//uncaught exception error
// throw new Error('I forgot to handle this error')
