import express, { Request, Response, NextFunction } from "express";
import { Post } from "../models/posts";
import { NotFoundError } from "@meline1/common";

const router = express.Router();

router.get("/api/posts/:id",  async (req: Request, res: Response, next: NextFunction) => {
    try{
        const post = await Post.findById(req.params.id);

        if (!post) {
            throw new NotFoundError();
        }
        return res.send(post);

    } catch (err) {
        throw err;
    }
});


export {
    router as showPostRouter
}