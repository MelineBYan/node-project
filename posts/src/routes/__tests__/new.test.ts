import request from 'supertest';
import { app } from '../../app';

it("has a route handler listening to api/post for posts request", async ()=> {
    const response = await request(app).post("/api/posts").send({})

})

