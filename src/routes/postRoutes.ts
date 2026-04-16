import { Router } from "express";
import { PostController } from "../controller/postController";

const router = Router();
const postController = new PostController();

router.get("/", (req, res) => postController.list(req, res));
router.post("/", (req, res) => postController.create(req, res));

export const postRouter = router;
