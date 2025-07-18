"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let server;
const port = 5000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb+srv://todosApp:Y3qRsLX2yG1tEVRe@cluster0.s6hdjpg.mongodb.net/phTourBackend?retryWrites=true&w=majority&appName=Cluster0');
        console.log('connected to DB!!');
        server = app_1.default.listen(port, () => {
            console.log(`server is listening on ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
//signal termination error(comes from virtual server)
process.on("SIGTERM", () => {
    console.log('Signal termination detected...server shuting down...');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
//signal initialization error(comes from sudden off of local server)
process.on("SIGINT", () => {
    console.log('Signal initialization detected...server shuting down...');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
//managing unhandled error
process.on("unhandledRejection", (err) => {
    console.log('Unhandled Rejection detected...server shuting down...', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
//managing uncaght error
process.on("uncaughtException", (err) => {
    console.log('Uncaught exception detected...server shuting down...', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
//unhandled rejection error
// Promise.reject(new Error('I forgot to handle this promise'))
//uncaught exception error
// throw new Error('I forgot to handle this error')
