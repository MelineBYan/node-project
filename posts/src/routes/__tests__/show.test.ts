import request from "supertest";
import { app } from "../../app";
import { Post } from "../../models/posts";

it("returns 404 if the post ID is not found", async () => {
    const invalidId = "123456789012345678901234";

    const response = await request(app).get(`/api/posts/${invalidId}`).send();

    expect(response.status).toEqual(404);
});

it("returns 400 if the post ID is invalid", async () => {
    const invalidId = "invalidID";

    const response = await request(app).get(`/api/posts/${invalidId}`).send();

    expect(response.status).toEqual(400);
});


it("returns the post if the ID is valid and exists", async () => {
    const testPost = Post.build({
        title: "Test Post",
        content: "This is a test post content.",
        userId: 'test_id'
    });
    await testPost.save();

    const response = await request(app).get(`/api/posts/${testPost.id}`).send();

    expect(response.status).toEqual(200);

    expect(response.body.id).toEqual(testPost.id);
    expect(response.body.title).toEqual(testPost.title);
    expect(response.body.content).toEqual(testPost.content);
});

