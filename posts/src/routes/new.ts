import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get('/api/posts', (req, res) => {
    res.send("Posts")
});

export {
    router as createPostRouter
}