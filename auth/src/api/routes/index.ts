import express from "express";
import { currentUserController} from "../controllers/currentUser";
import { signIn } from "../controllers/signin";
import { signUp } from "../controllers/signup";
import { validateAuth } from "../../validate";
import { validateRequest, currentUser } from "@meline1/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, currentUserController);

router.post("/api/users/signin", validateAuth, validateRequest, signIn);

router.post("/api/users/signup", validateAuth, validateRequest, signUp);

export { router };