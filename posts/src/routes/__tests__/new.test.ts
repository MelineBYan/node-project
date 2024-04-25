import request from "supertest";
import { app } from "../../app";
import { Post } from "../../models/posts";

it("has a route handler listening to /api/posts for post request", async () => {
    const response = await request(app).post("/api/posts").send({});

    expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
    await request(app).post("/api/posts").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
    const response = await request(app)
        .post("/api/posts")
        .set("Authorization", global.signin())
        .send({});

    expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
    await request(app)
        .post("/api/posts")
        .set("Authorization", global.signin())
        .send({
            title: "",
            content: "some content",
        })
        .expect(400);

    await request(app)
        .post("/api/posts")
        .set("Authorization", global.signin())
        .send({
            content: "some content",
        })
        .expect(400);
});

it("returns an error if an invalid content is provided", async () => {
    await request(app)
        .post("/api/posts")
        .set("Authorization", global.signin())
        .send({
            title: "some title",
            content: "",
        })
        .expect(400);

    await request(app)
        .post("/api/posts")
        .set("Authorization", global.signin())
        .send({
            title: "some title",
        })
        .expect(400);
});

it("creates post with valid inputs", async () => {
let posts = await Post.find({});
expect(posts.length).toEqual(0);

const title = "some title";
const content = "some content";

    await request(app)
        .post("/api/posts")
        .set("Authorization", global.signin())
        .send({
            title,
            content,
        })
        .expect(201);
    posts = await Post.find({});


    expect(posts.length).toEqual(0);
    expect(posts[0].title).toEqual(title);
    expect(posts[0].content).toEqual(content);
});