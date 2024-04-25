import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

let mongo: MongoMemoryServer;

declare global {
    namespace NodeJS {
        interface Global {
            signin(id?: string): string;
        }
    }
    var signin: (id?: string) => string;
}

beforeAll(async () => {
    process.env.NODE_ENV = "test";
    process.env.JWT_KEY = "test_key";
    process.env.JWT_EXPIRATION = "15m";

    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
        await collection.deleteMany({});
    }

    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});


global.signin = (id?: string) => {
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: "test.example@gmail.com"
    }

    const  token =  jwt.sign(payload, process.env.JWT_KEY as string);
    return `Bearer ${token}`;
}