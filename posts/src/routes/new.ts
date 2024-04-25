import express, { Request, Response, NextFunction } from "express";
import { currentUser } from "../../../common";
import { validateRequest } from "@meline1/common";
import { validateNewPost } from "../validate";
import { Post } from "../models/posts";

const router = express.Router();

router.post('/api/posts', currentUser, validateNewPost, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content } = req.body;

        const post = Post.build({
            title, content, userId: req.currentUser!.id
        })

        await post.save();
        res.status(201).send(post);
    } catch (err) {
        throw err;
    }
});

export {
    router as createPostRouter
}