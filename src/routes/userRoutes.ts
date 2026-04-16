import { Router } from "express";
import { UserController } from "../controller/userController";

const router = Router();
const userController = new UserController();

router.post("/", (req, res) => userController.create(req, res));
router.get("/", (req, res) => userController.list(req, res));
router.delete("/:id", (req, res) => userController.deletar(req, res));
router.patch("/:id", (req, res) => userController.update(req, res));

export const userRouter = router;
