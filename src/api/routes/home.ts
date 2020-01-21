import express from "express";
import * as homeController from "./../controllers/home";

const router = express.Router();

router.get("/", homeController.index);

export default router;
